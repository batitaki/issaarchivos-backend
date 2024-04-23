const db = require("../database/models");

const getMediaColors = async (req, res) => {
  try {
    const colors = await db.Color.findAll();
    const colorNames = colors.map((color) => color.Name);
    res.json(colorNames);
  } catch (error) {
    console.error("Error fetching colors:", error);
    res.status(500).json({ error: "Error fetching colors" });
  }
};

const createColor = async (req, res) => {
  try {
    const { name } = req.body;

    const existingColor = await db.Color.findOne({ where: { Name: name } });
    if (existingColor) {
      return res.status(400).json({ error: "El color ya existe" });
    }

    const newColor = await db.Color.create({ Name: name });

    res
      .status(201)
      .json({
        message: "Color creado exitosamente",
        color: { id: newColor.ID, name: newColor.Name },
      });
  } catch (error) {
    console.error("Error creating color:", error);
    res.status(500).json({ error: "Error al crear el color" });
  }
};

module.exports = {
  getMediaColors,
  createColor,
};
