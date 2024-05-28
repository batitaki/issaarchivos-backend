// productRoutes.js
const express = require("express");
const router = express.Router();
const cloudinary = require("cloudinary").v2;
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const productController = require("../controllers/productController");

cloudinary.config({
  cloud_name: "dvsryvrpn",
  api_key: "293146465739794",
  api_secret: "N5s5LJQb0cznepYhSkQwb9W8fbA",
});

const imageCloudinaryStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "Products",
    allowed_formats: ["jpg", "png", "jpeg", "webp", "avif", "JPG"],
  },
});

const imageCloudinaryUpload = multer({ storage: imageCloudinaryStorage });

router.get("/products", productController.getProducts);

router.get("/products/:id", productController.getProductById);

router.get("/search", productController.searchProducts);

router.post("/payment", productController.payment)


router.get("/byCategory/:categoryId", productController.getProductsByCategory);

router.post(
  "/createProduct",
  imageCloudinaryUpload.array("Image"),
  productController.createProduct
);

module.exports = router;
