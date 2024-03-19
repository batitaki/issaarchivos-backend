const express = require("express");
const router = express.Router();
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("cloudinary").v2;
const mediaController = require("../controllers/mediaController");

// Configurar Cloudinary
cloudinary.config({
  cloud_name: "dpnrapsvi",
  api_key: "874593837933416",
  api_secret: "c_a2SUynA5J4O6y5yFCbL6HzADA",
});

// Configurar almacenamiento de Cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "Media",
    resource_type: "auto",
  },
});

// Configurar multer con el almacenamiento de Cloudinary
const upload = multer({ storage: storage });

router.get("/media", mediaController.getAllMedia)

router.get("/media/color", mediaController.getMediaColors)

router.post("/create-color", mediaController.createColor);

// Ruta para subir una imagen
router.post("/upload", upload.array("Image"), mediaController.uploadMedia);

router.get("/byProduct/:productId", mediaController.getMediaByProduct);

module.exports = router;
