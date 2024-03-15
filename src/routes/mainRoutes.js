// mainRoutes.js
const express = require("express");
const router = express.Router();

const productRoutes = require("./productRoutes")

router.get("/", (req, res) => {
    res.send("Welcome to the root URL");
  });

router.use("/products", productRoutes);
// Agrega otras rutas según sea necesario

module.exports = router;