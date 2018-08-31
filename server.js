// NPM dependencies
const express = require("express");
const bodyParser = require("body-parser");

// File dependencies
const routes = require("./routes");

// Sets up the Express App
// =============================================================
const app = express();
const PORT = process.env.PORT || 3000;
const db = require("./models");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
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
    console.log("App listening on PORT " + PORT);
  });
});
