const friends = require('./../data/friends');

module.exports = function(app){
    // Displays all friends
    app.get("/api/friends", function(req, res) {
        return res.json(friends);
    });
    
    // Displays a single character, or returns false
    // app.get("/api/characters/:character", function(req, res) {
    //     const chosen = req.params.character;
    
    //     console.log(chosen);
    
    //     for (let i = 0; i < characters.length; i++) {
    //     if (chosen === characters[i].routeName) {
    //         return res.json(characters[i]);
    //     }
    //     }
    
    //     return res.json(false);
    // });
    
    // Create New Characters - takes in JSON input
    app.post("/api/friends", function(req, res) {
        // req.body hosts is equal to the JSON post sent from the user
        // This works because of our body parsing middleware
       const newFriend = req.body;
    
        console.log(newFriend);
    
        let match = 40;
        let perfectMatch;
        friends.forEach(person=>{
            let difference = 0;
            for(let i =0;i<person.scores.length;i++){
                difference += Math.abs(parseInt(person.scores[i])-newFriend.scores[i]);
            }
            if(difference<match){
                match = difference;
                perfectMatch = {name: person.name, photo: person.photo};
                
            }
        });
        friends.push(newFriend);
        //return the match name and photo
        return res.json(perfectMatch);
    });
};