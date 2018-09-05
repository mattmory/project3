const router = require("express").Router();

const favoritesController = require("../../controllers/favoritesController");

router.route("/")
  .get(favoritesController.findAll)
router.route("/:userId")
  .get(favoritesController.findByUserId)
router.route("/")
  .post(favoritesController.addFavorite)
router.route("/")
  .delete(favoritesController.deleteFavorite)

module.exports = router;