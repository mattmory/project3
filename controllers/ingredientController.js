const db = require("../models");

module.exports = {
  // Handler for /api/ingredient/, Get
  // Returns all Ingredeients
  findAll: function (req, res) {
    db.ingredients.findAll({order: ["name"]})
      .then(function (dbIngredients) {
        res.json(dbIngredients);
      });
  },

  // Handler for /api/ingredient/:name, Get
  // Returns the ingredient specified by :name
  findByName: function (req, res) {
    db.ingredients.findOne({
      where: {
        name: req.params.name
      },
    })
      .then(function (dbIngredients) {
        res.json(dbIngredients);
      });
  },

  // Handler for /api/ingredient, Post
  // Returns the ingredient specified by :name
  addIngredient: function (req, res) {
    //Check to see if the ingredient exists
    db.ingredients.findOne({
      where: { name: req.body.name },
    }).then(function (ingredient) {
      if (ingredient != null) {
        res.status(200).send("Ingredient exists.");
      }
      else {
        var desc = req.body.description;
        if (desc === null || desc === "") {
          desc = null
        }
        db.ingredients.create({
          name: req.body.name,
          description: desc
        }).then(function () {
          res.status(200).end();
        })
      }
    }).catch(function (err) {
      throw err;
    })
  }
};