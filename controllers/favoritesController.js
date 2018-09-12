const db = require("../models");

module.exports = {
  // Handler for /api/favorites, Get
  // Returns all favorites
  findAll: function (req, res) {
    db.sequelize.query("select count(*) as favCount, drink_id from favorites group by drink_id order by favCount desc;")
      .then(function (dbFavorites) {
        res.json(dbFavorites[0]);
      })
      .catch(function (error) {
        console.log(error);
      });
  },

  // Handler for /api/favorites/:userId, Get
  // Returns favorites for the user specified by the userId
  findByUserId: function (req, res) {
    db.sequelize.query("select favorites.drink_id from favorites, drinks where favorites.drink_id = drinks.id and favorites.user_id = " + req.params.userId + " order by drinks.name;",{type: db.Sequelize.QueryTypes.SELECT})
      .then(function (dbFavorites) {
        res.json(dbFavorites);
      })
      .catch(function (error) {
        console.log(error);
      });
  },

  // Handler for /api/favorites, Post
  // Adds a favorite specified by the drink_id and user_id of the body
  addFavorite: function (req, res) {
    //Check to see if the favorite combo exists
    db.Favorites.findOne({
      where: { user_id: req.body.user_id, drink_id: req.body.drink_id },
    }).then(function (dbFavorite) {
      if (dbFavorite !== null) {
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
    db.Favorites.destroy({
      where: {
        user_id: req.body.user_id,
        drink_id: req.body.drink_id
      }
    }).then(function () {
      res.status(200).end();
    })
      .catch(function (err) {
        throw err;
      })
  }
};