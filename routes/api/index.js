const router = require("express").Router();
const drinkRoutes = require("./drink");
const ingredientRoutes = require("./ingredient");
const userRoutes = require("./user");
const favoriteRoutes = require("./favorites");

router.use("/drink", drinkRoutes);
router.use("/ingredient", ingredientRoutes);
router.use("/user", userRoutes);
router.use("/favorites", favoriteRoutes);

module.exports = router;