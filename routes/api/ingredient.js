const router = require("express").Router();
const ingredientController = require("../../controllers/ingredientController");

// Routes
router.route("/")
  .get(ingredientController.findAll);

router.route("/:name")
  .get(ingredientController.findByName);

router.route("/")
  .post(ingredientController.addIngredient)

module.exports = router;