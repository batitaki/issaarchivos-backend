// mainRoutes.js
const express = require("express");
const router = express.Router();

const mediaRoutes = require("./mediaRoutes");
const productRoutes = require("./productRoutes");
const categoryRoutes = require("./categoryRoutes");
const colorRoutes = require("./colorRoutes");
const userRoutes = require("./userRoutes");

router.get("/", (req, res) => {
  res.send("Welcome to the root URL");
});

router.use("/products", productRoutes);
router.use("/media", mediaRoutes);
router.use("/category", categoryRoutes);
router.use("/color", colorRoutes);
router.use("/user", userRoutes);

module.exports = router;
