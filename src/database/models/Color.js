// models/Color.js

function colorData(sequelize, DataTypes) {
    let colorTableName = 'Color';
  
    let colorColumns = {
      ID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      Name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      // Otros campos relevantes para el color, como código hexadecimal, descripción, etc.
    };
  
    let colorConfig = {
      timestamps: false,
      tableName: 'Color',
    };
  
    const Color = sequelize.define(colorTableName, colorColumns, colorConfig);
  
    Color.associate = function (models) {
      Color.belongsToMany(models.Media, {
        through: 'MediaColor', // Tabla intermedia que relaciona los colores con las imágenes de media
        foreignKey: 'ColorID',
        otherKey: 'MediaID',
        as: 'Media', // Alias para la relación
      });
    };
  
    return Color;
  }
  
  module.exports = colorData;
  