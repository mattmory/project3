const router = require("express").Router();
const drinkController = require("../../controllers/drinkController");


router.route("/")
  .get(drinkController.findAll)
router.route("/:drinkId")
  .get(drinkController.findById)
router.route("/ing/:ingId")
  .get(drinkController.findByIng)
router.route("/")
  .post(drinkController.addDrink)

module.exports = router;


