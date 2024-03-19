function mediaData(sequelize, DataTypes) {
    let mediaTableName = 'Media';
  
    let mediaColumns = {
      ID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      Image: {
        type: DataTypes.STRING, // O el tipo de dato adecuado para almacenar la URL o ruta de la imagen
        allowNull: false,
      },
  
      ProductID: {
        type: DataTypes.INTEGER,
        allowNull: false,
      }
    };
  
    let mediaConfig = {
      timestamps: false,
      tableName: 'Media',
    };
  
    const Media = sequelize.define(mediaTableName, mediaColumns, mediaConfig);
  
    Media.associate = function(models) {
      Media.belongsTo(models.Product, {
        foreignKey: 'ProductID',
        as: 'Product' // Nombre del alias para la asociación
      });
    
      Media.belongsToMany(models.Color, {
        through: 'MediaColor', // Tabla intermedia que relaciona los colores con las imágenes de media
        foreignKey: 'MediaID',
        otherKey: 'ColorID',
        as: 'Colors', // Alias para la relación
      });
    };
    
    return Media;
  }
  
  module.exports = mediaData;
  