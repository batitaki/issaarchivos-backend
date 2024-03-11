// mainRoutes.js
const express = require("express");
const router = express.Router();

const productRoutes = require("./productRoutes")

router.use("/products", productRoutes);
// Agrega otras rutas según sea necesario

module.exports = router;