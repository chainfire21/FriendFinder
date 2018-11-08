// Dependencies
// =============================================================
const express = require("express");


// Sets up the Express App
// =============================================================
const app = express();
const PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// Routes
// =============================================================

// Basic route that sends the user first to the AJAX Page
require('./app/routing/htmlRoutes')(app);
require('./app/routing/apiRoutes')(app);

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function () {
  console.log("App listening on PORT " + PORT);
});