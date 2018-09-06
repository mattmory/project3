const db = require("../models");

module.exports = {
  // Handler for login
  login: function (req, res) {
    res.json({
      email: req.body.email,
      isAuthenticated: true,
      id: req.user.id,
    });
  },

  register: function (req, res) {
    db.User.create({
      email: req.body.email,
      password: req.body.password,
    })
      .then(() => {
        res.json({ message: "Account creation successful."});
      })
      .catch(() => {
        res.json({ message: "Account creation failed."});
      });
  }
};