// mainRoutes.js
const express = require("express");
const router = express.Router();

const mediaRoutes = require("./mediaRoutes")
const productRoutes = require("./productRoutes")

router.get("/", (req, res) => {
    res.send("Welcome to the root URL");
  });

router.use("/products", productRoutes);
router.use("/media", mediaRoutes);



module.exports = router;