const db = require("../database/models");

const getCategory = async (req, res) => {
  try {
    const category = await db.Category.findAll();
    res.json(category);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error obtaining categories" });
  }
};

const getCategoryById = async (req, res) => {
  try {
    const categoryId = req.params.categoryId;
    const category = await db.Category.findByPk(categoryId);

    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }

    res.json(category);
  } catch (error) {
    console.error(`Error obtaining category with ID ${req.params.categoryId}:`, error);
    res.status(500).json({ error: "Error obtaining category" });
  }
};
  
module.exports = {
  getCategory,
  getCategoryById,
};
