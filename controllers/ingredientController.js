const db = require("../models");

module.exports = {
  // Handler for /api/ingredient
  findAll: function (req, res) {
    db.ingredients.findAll()
      .then(function (dbIngredients) {
        res.json(dbIngredients);
      });
  }

  // TODO: Add more handlers
};