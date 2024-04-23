// mainRoutes.js
const express = require("express");
const router = express.Router();

const mediaRoutes = require("./mediaRoutes");
const productRoutes = require("./productRoutes");
const categoryRoutes = require("./categoryRoutes");
const colorRoutes = require("./colorRoutes");

router.get("/", (req, res) => {
  res.send("Welcome to the root URL");
});

router.use("/products", productRoutes);
router.use("/media", mediaRoutes);
router.use("/category", categoryRoutes);
router.use("/color", colorRoutes);

module.exports = router;
