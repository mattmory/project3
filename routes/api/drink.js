const router = require("express").Router();
const drinkController = require("../../controllers/drinkController");

// Routes --more routes inc
router.route("/")
  .get(drinkController.findAll);

module.exports = router;