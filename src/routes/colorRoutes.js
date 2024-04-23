const express = require("express");
const router = express.Router();
const colorController = require("../controllers/colorController");

router.get("/colors", colorController.getMediaColors);

router.post("/create-color", colorController.createColor);

module.exports = router;
