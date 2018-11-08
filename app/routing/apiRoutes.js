const friends = require('./../data/friends');
const mysql = require("mysql");


//create mySQL connection information
if (process.env.NODE_ENV === 'production') {
    const connection = mysql.createConnection(process.env.JAWSDB_URL);
    // connect to the mysql server and sql database
    connection.connect(function (err) {
        if (err) throw err;
        console.log("connected");
    });
}
else {
    const connection = mysql.createConnection({
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
        return res.json(friends);
    });

    // Create New Friend - takes in JSON input
    app.post("/api/friends", function (req, res) {

        // req.body hosts is equal to the JSON post sent from the user
        const newFriend = req.body;

        //search for the perfect match before adding the new friend
        let match = 40;
        let perfectMatch;
        friends.forEach(person => {
            let difference = 0;
            for (let i = 0; i < person.scores.length; i++) {
                difference += Math.abs(parseInt(person.scores[i]) - newFriend.scores[i]);
            }
            if (difference < match) {
                match = difference;
                perfectMatch = { name: person.name, photo: person.photo };

            }
        });

        friends.push(newFriend);
        //return the match name and photo
        return res.json(perfectMatch);
    });
};