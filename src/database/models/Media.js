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
      // Definir la asociación con el modelo User
      Media.belongsTo(models.Product, {
        foreignKey: 'ProductID',
        as: 'Product' // Nombre del alias para la asociación
      });
    };
  
    return Media;
  }
  
  module.exports = mediaData;
  