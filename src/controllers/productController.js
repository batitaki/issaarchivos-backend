// ProductController.js
const db = require("../database/models");

const getProducts = async (req, res) => {
    try {
      const products = await db.Product.findAll();
      res.json(products);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error obtaining products" });
    }
  };

  const getProductById = async (req, res) => {
    try {
      const productId = req.params.productId;
      const product = await db.Product.findByPk(productId);
      res.json(product);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error obtaining sketch" });
    }
  };

const createProduct = async (req, res) => {
    try {
      const newProduct= req.body;
      const ProductImageUpload = req.files;
      const firstImage = ProductImageUpload[0].filename;
      const cloudinaryImageUrl = `https://res.cloudinary.com/dvsryvrpn/image/upload/${firstImage}`;
      newProduct.ProductID = req.body.ProductID;
  
      const newProductEntry = await db.Product.create({
        Name: newProduct.Name,
        Description: newProduct.Description,
        Image: cloudinaryImageUrl,
        Price: newProduct.Price,
      });
  
      res.status(201).json({ message: "Product created successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error creating the Product" });
    }
  };
  


module.exports = {
    getProducts,
    createProduct,
    getProductById
  };
  
  