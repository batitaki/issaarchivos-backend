const db = require("../database/models");
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
    res
      .status(500)
      .json({ error: `Error obtaining Product details: ${error.message}` });
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
      Image: cloudinaryImageUrl,
      CategoryID: newProduct.CategoryID,
    });

    res.json({ message: "Product created successfully" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: `Error publishing the Product: ${error.message}` });
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
    console.error(
      `Error obtaining products for category with ID ${req.params.categoryId}:`,
      error
    );
    res.status(500).json({ error: "Error obtaining product for category" });
  }
};

module.exports = {
  getProducts,
  createProduct,
  getProductById,
  getProductsByCategory,
};