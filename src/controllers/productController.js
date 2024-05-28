const db = require("../database/models");
const { Op } = require('sequelize');
const { MercadoPagoConfig, Preference } = require('mercadopago')

require("dotenv").config();


const client = new MercadoPagoConfig({ accessToken: "APP_USR-7069362539902743-102021-be7df0deb5aede5378166dc976e7954c-132322532" });

const payment = async (req, res) => {
  try {
  const body = {
      items: [
        {
          title: req.body.Name,
          quantity: Number (req.body.Quantity),
          unit_price: Number(req.body.Price),
          currency_id: "ARS",
        },
      ],
      back_urls: {
        success: "https://www.youtube.com/watch?v=vEXwN9-tKcs&t=1s",
        failure: "https://www.youtube.com/watch?v=vEXwN9-tKcs&t=1s",
        pending: "https://www.youtube.com/watch?v=vEXwN9-tKcs&t=1s",
      },
      auto_return: "approved",
    };
    const preference = new Preference(client)
    const result = await preference.create({ body })
    res.json({ 
        id: result.id,
    });
  } catch (error) {
    console.error('Error creating payment:', error);
    res.status(500).json({
      error: "error al crear payment"
    })
  }
};


const getProducts = async (req, res) => {
  try {
    const products = await db.Product.findAll({
      include: [
        { model: db.Category, as: "Category" },

        { model: db.Size, as: "Sizes" },
      ],
    });
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error obtaining products" });
  }
};

const getProductById = async (req, res) => {
  try {
    const productId = req.params.id;
    const productDetails = await db.Product.findByPk(productId, {
      include: [
        { model: db.Category, as: "Category" },
        { model: db.Size, as: "Sizes" },
      ],
    });

    if (!productDetails) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.json(productDetails);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: `Error obtaining product details: ${error.message}` });
  }
};

const createProduct = async (req, res) => {
  try {
    const newProduct = req.body;
    const productImageUpload = req.files;
    const firstImage = productImageUpload[0].filename;
    const cloudinaryImageUrl = `https://res.cloudinary.com/dvsryvrpn/image/upload/${firstImage}`;
    newProduct.CategoryID = req.body.CategoryID;

    const newProductEntry = await db.Product.create({
      Name: newProduct.Name,
      Description: newProduct.Description,
      Price: newProduct.Price,
      Care: newProduct.Care,
      Image: cloudinaryImageUrl,
      CategoryID: newProduct.CategoryID,
    });

    res.json({ message: "Product created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: `Error publishing the product: ${error.message}` });
  }
};

const getProductsByCategory = async (req, res) => {
  try {
    const categoryId = req.params.categoryId;
    const products = await db.Product.findAll({
      where: { CategoryID: categoryId },
    });
    res.json(products);
  } catch (error) {
    console.error(`Error obtaining products for category with ID ${req.params.categoryId}:`, error);
    res.status(500).json({ error: "Error obtaining products for category" });
  }
};

const searchProducts = async (req, res) => {
  try {
    const searchTerm = req.query.term;

    const products = await db.Product.findAll({
      where: { Name: { [Op.like]: `%${searchTerm}%` } },
      include: [
        { model: db.Category, as: "Category" },
        { model: db.Size, as: "Sizes" },
      ],
    });

    res.json(products);
  } catch (error) {
    console.error("Error searching products:", error);
    res.status(500).json({ error: "Error searching products" });
  }
};

module.exports = {
  getProducts,
  createProduct,
  getProductById,
  getProductsByCategory,
  searchProducts,
  payment
};
