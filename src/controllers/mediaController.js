const db = require('../database/models');

const getAllMedia = async (req, res) => {
  try {
    const allMedia = await db.Media.findAll({
      include: [{
        model: db.Color,
        as: 'Colors' // Alias de la relación
      }]
    });

    res.json(allMedia);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener los medios" });
  }
};

const getMediaByProduct = async (req, res) => {
  try {
    const productId = req.params.productId;
    const media = await db.Media.findAll({
      where: { ProductID: productId },
      include: [{
        model: db.Color,
        as: 'Colors' // Alias de la relación
      }]
    });
    res.json(media);
  } catch (error) {
    console.error(
      `Error obtaining media photos for product with ID ${req.params.mediaId}:`,
      error
    );
    res.status(500).json({ error: "Error obtaining media for product" });
  }
};

const uploadMedia = async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res
        .status(400)
        .json({ error: "No se ha proporcionado ninguna imagen" });
    }

    const { ProductID, Color } = req.body;

    const uploadedFiles = req.files;
    const uploadedMedia = uploadedFiles.map((file) => ({
      Image: file.path,
      ProductID,
      Color, // Agregar el color proporcionado
    }));

    const createdMedia = await db.Media.bulkCreate(uploadedMedia);

    res.json({ message: "Medios creados exitosamente", media: createdMedia });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al cargar los medios" });
  }
};

const getMediaColors = async (req, res) => {
  try {
    const colors = await db.Color.findAll();
    const colorNames = colors.map(color => color.Name);
    res.json(colorNames);
  } catch (error) {
    console.error('Error fetching colors:', error);
    res.status(500).json({ error: 'Error fetching colors' });
  }
};

const createColor = async (req, res) => {
  try {
    const { name } = req.body;

    // Verificar si el color ya existe
    const existingColor = await db.Color.findOne({ where: { Name: name } });
    if (existingColor) {
      return res.status(400).json({ error: 'El color ya existe' });
    }

    // Crear el nuevo color
    const newColor = await db.Color.create({ Name: name });

    // Enviar una respuesta con datos serializables
    res.status(201).json({ message: 'Color creado exitosamente', color: { id: newColor.ID, name: newColor.Name } });
  } catch (error) {
    console.error('Error creating color:', error);
    res.status(500).json({ error: 'Error al crear el color' });
  }
};


module.exports = {
  uploadMedia,
  getAllMedia,
  getMediaByProduct,
  getMediaColors,
  createColor
};
