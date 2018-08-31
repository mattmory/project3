const router = require("express").Router();
const ingredientController = require("../../controllers/ingredientController");

// Routes --more inc
router.route("/")
  .get(ingredientController.findAll);

module.exports = router;