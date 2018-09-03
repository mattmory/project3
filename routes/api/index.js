const router = require("express").Router();
const drinkRoutes = require("./drink");
const ingredientRoutes = require("./ingredient");
const userRoutes = require("./user");

router.use("/drink", drinkRoutes);
router.use("/ingredient", ingredientRoutes);
router.use("/user", userRoutes);

module.exports = router;