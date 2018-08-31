const db = require("../models");

module.exports = {
  // Handler for /api/ingredient
  findAll: function (req, res) {
    db.drinks.findAll()
      .then(function (dbDrinks) {
        res.json(dbDrinks);
      });
  }

  // TODO: Add more handlers
};