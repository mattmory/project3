const db = require("../models");

module.exports = {
  // Handler for login
  login: function (req, res) {
    res.json({ "isAuthenticated": true });
  },

  register: function (req, res) {
    db.User.create({
      email: req.body.email,
      password: req.body.password,
    })
      .then(() => {
        res.json({ "isAuthenticated": true });
      });
  }

};