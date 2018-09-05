const db = require("../models");

module.exports = {
  // Handler for /api/favorites, Get
  // Returns all favorites
  findAll: function (req, res) {
    db.Favorites.findAll()
      .then(function (dbFavorites) {
        res.json(dbFavorites);
      });
  },

  // Handler for /api/favorites/:userId, Get
  // Returns favorites for the user specified by the userId
  findById: function (req, res) {
    db.Favorites.findAll({
      where: {
        user_id: [req.params.userId]
      }
    })
      .then(function (dbFavorites) {
        res.json(dbFavorites);
      });
  },

  // Handler for /api/favorites, Post
  // Adds a favorite specified by the drink_id and user_id of the body
  addFavorite: function (req, res) {
    //Check to see if the favorite combo exists
    console.log(req.body)
    db.Favorites.findOne({
      where: { user_id: req.body.user_id, drink_id: req.body.drink_id },
    }).then(function (dbFavorite) {
      if (dbFavorite != null) {
        res.status(200).send("Favorite exists for user.");
      }
      else {
        db.Favorites.create({
          user_id: req.body.user_id,
          drink_id: req.body.drink_id
        }).then(function () {
          res.status(200).end();
        })
      }
    }).catch(function (err) {
      throw err;
    })
  },
 
  // Handler for /api/favorites, Delete
  // Deletes the favorite specified by the drink_id and user_id of the body
  deleteFavorite: function (req, res) {
    db.Favorites.destroy({where: {
      user_id: req.body.user_id,
      drink_id: req.body.drink_id
    }}).then(function () {
      res.status(200).end();
    })
      .catch(function (err) {
        throw err;
      })
  }
};