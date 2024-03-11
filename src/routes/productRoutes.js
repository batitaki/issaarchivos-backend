// productRoutes.js
const express = require("express");
const router = express.Router();
const cloudinary = require("cloudinary").v2;
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const productController = require("../controllers/productController");

const imageCloudinaryStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "Products",
    allowed_formats: ["jpg", "png", "jpeg", "webp"],
  },
});

const imageCloudinaryUpload = multer({ storage: imageCloudinaryStorage });

// router.get("/products", productController.getProducts);

// router.get("/products/:id", productController.getProductById);

/*router.post(
  "/createProduct",
  imageCloudinaryUpload.array("Image"),
  productController.createProduct
);*/

module.exports = router;
