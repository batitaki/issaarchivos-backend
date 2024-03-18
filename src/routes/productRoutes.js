// productRoutes.js
const express = require("express");
const router = express.Router();
const cloudinary = require("cloudinary").v2;
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const productController = require("../controllers/productController");
          
cloudinary.config({ 
  cloud_name: 'dvsryvrpn', 
  api_key: '293146465739794', 
  api_secret: 'N5s5LJQb0cznepYhSkQwb9W8fbA' 
});

const imageCloudinaryStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "Products",
    allowed_formats: ["jpg", "png", "jpeg", "webp","avif"],
  },
});

const imageCloudinaryUpload = multer({ storage: imageCloudinaryStorage });

router.get("/products", productController.getProducts);

router.get("/category", productController.getCategory);

router.get("/category/:categoryId", productController.getCategoryById); // Agregar la nueva ruta

router.get("/byCategory/:categoryId", productController.getProductsByCategory);

router.get("/products/:id", productController.getProductById);

router.post(
  "/createProduct",
  imageCloudinaryUpload.array("Image"),
  productController.createProduct
);

module.exports = router;
