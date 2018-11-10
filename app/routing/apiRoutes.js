const friends = require('./../data/friends');
const mysql = require("mysql");
let connection;
//create mySQL connection information
if (process.env.NODE_ENV === 'production') {
    connection = mysql.createConnection(process.env.JAWSDB_URL);
    // connect to the mysql server and sql database
    connection.connect(function (err) {
        if (err) throw err;
        console.log("connected");
    });
}
else {
    connection = mysql.createConnection({
        host: "localhost",
        port: 3306,
        user: "root",
        password: "",
        database: "friends_db"
    });
    // connect to the mysql server and sql database
    connection.connect(function (err) {
        if (err) throw err;
        console.log("connected");
    });
}

module.exports = function (app) {
    // Displays all friends
    app.get("/api/friends", function (req, res) {
        connection.query(`SELECT people.name, people.photo, scores.q1, scores.q2,scores.q3,scores.q4,scores.q5,
        scores.q6,scores.q7,scores.q8,scores.q9,scores.q10 FROM people INNER JOIN scores WHERE people.id = scores.id`,
            function (err, response) {
                if (err) throw err;
                const result = [];
                for (let j = 0; j < response.length; j++) {
                    const person = {};
                    person.name = response[j].name;
                    person.photo = response[j].photo;
                    person.scores = [];
                    for (let i = 1; i < 11; i++) {
                        person.scores.push(response[j]["q" + i]);
                    }
                    result.push(person);
                };
                return res.json(result);
            });
    });

    // Create New Friend - takes in JSON input
    app.post("/api/friends", function (req, res) {

        // req.body hosts is equal to the JSON post sent from the user
        const newFriend = req.body;

        //search for the perfect match before adding the new friend
        let match = 40;
        let perfectMatch;
        connection.query(`SELECT people.name, people.photo, scores.q1, scores.q2,scores.q3,scores.q4,scores.q5,
        scores.q6,scores.q7,scores.q8,scores.q9,scores.q10 FROM people INNER JOIN scores WHERE people.id = scores.id`,
            function (err, response) {
                if (err) throw err;
                response.forEach(person => {
                    let difference = 0;
                    for (let i = 0; i < 10; i++) {
                        difference += Math.abs(parseInt(person["q" + (i+1)]) - parseInt(newFriend.scores[i]));
                    }
                    if (difference < match) {
                        match = difference;
                        perfectMatch = { name: person.name, photo: person.photo };

                    }
                });
                res.send(perfectMatch);
            }
        );
        //add the new friend
        connection.query("INSERT INTO people SET ?", {
            name: newFriend.name,
            photo: newFriend.photo,
        }, function (err, res) {
            if (err) throw err;
        });
        connection.query("INSERT INTO scores SET ?", {
            q1: newFriend.scores[0],
            q2: newFriend.scores[1],
            q3: newFriend.scores[2],
            q4: newFriend.scores[3],
            q5: newFriend.scores[4],
            q6: newFriend.scores[5],
            q7: newFriend.scores[6],
            q8: newFriend.scores[7],
            q9: newFriend.scores[8],
            q10: newFriend.scores[9],
        }, function (err, res) {
            if (err) throw err;
        });

    });
};