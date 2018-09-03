const router = require("express").Router();

const passport = require("../../config/passport");
const userController = require("../../controllers/userController");

// Routes
router.route("/login")
  .post(passport.authenticate("local"), userController.login);

router.route("/register")
  .post(userController.register);

module.exports = router;