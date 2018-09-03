// NPM dependencies
const express = require("express");
const bodyParser = require("body-parser");
var session = require("express-session");
// Requiring passport as we've configured it
var passport = require("./config/passport");

// File dependencies
const routes = require("./routes");

// Sets up the Express App
// =============================================================
const app = express();
const PORT = process.env.PORT || 3001;
const db = require("./models");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// We need to use sessions to keep track of our user's login status
app.use(session({ secret: "keyboard cat", resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

// Serve up static assets
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}
// Add routes, both API and view
app.use(routes);


// Syncing our sequelize models and then starting our Express app
// =============================================================
db.sequelize.sync().then(function () {
  app.listen(PORT, function () {
    console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
  });
});
