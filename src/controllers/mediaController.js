const db = require('../database/models');

const getAllMedia = async (req, res) => {
    try {
      // Obtener todos los medios de la base de datos
      const allMedia = await db.Media.findAll();
  
      // Devolver los medios obtenidos
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
      // Verificar si se cargó un archivo
      if (!req.files || req.files.length === 0) {
        return res
          .status(400)
          .json({ error: "No se ha proporcionado ninguna imagen" });
      }
  
      const uploadedFiles = req.files;
      const uploadedMedia = uploadedFiles.map((file) => ({
        Image: file.path, // Ruta temporal del archivo subido
        ProductID: req.body.ProductID, // ID del usuario obtenido del cuerpo de la solicitud
      }));
  
      // Crear las entradas de medios en la base de datos
      const createdMedia = await db.Media.bulkCreate(uploadedMedia);
  
      res.json({ message: "Medios creados exitosamente", media: createdMedia });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error al cargar los medios" });
    }
  };
  


module.exports = {
  uploadMedia,
  getAllMedia,
  getMediaByProduct
};
