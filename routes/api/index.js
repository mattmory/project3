const router = require("express").Router();
const drinkRoutes = require("./drink");
const ingredientRoutes = require("./ingredient");

router.use("/drink", drinkRoutes);
router.use("/ingredient", ingredientRoutes);

module.exports = router;