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
        connection.query(`SELECT people.name, people.photo, people.scores FROM people`,
            function (err, response) {
                if (err) throw err;
                const result = [];
                for (let j = 0; j < response.length; j++) {
                    const person = {};
                    person.name = response[j].name;
                    person.photo = response[j].photo;
                    person.scores = response[j].scores.split(",");
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
        connection.query(`SELECT people.name, people.photo, people.scores FROM people`,
            function (err, response) {
                if (err) throw err;
                response.forEach(person => {
                    let difference = 0;
                    for (let i = 0; i < 10; i++) {
                        difference += Math.abs(parseInt(person.scores.split(",")[i]) - parseInt(newFriend.scores[i]));
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
            scores: newFriend.scores.join(","),
        }, function (err, res) {
            if (err) throw err;
        });

    });
};