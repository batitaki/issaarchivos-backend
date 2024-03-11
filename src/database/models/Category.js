// models/Category.js

function categoryData(sequelize, DataTypes) {
  let categoryTableName = 'Category';

  let categoryColumns = {
      ID: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true
      },
      Name: {
          type: DataTypes.STRING,
          allowNull: false
      },
      Description: {
          type: DataTypes.TEXT,
          allowNull: true
      }
  };

  let categoryConfig = {
      timestamps: false,
      tableName: 'Category',
  };

  const Category = sequelize.define(
      categoryTableName,
      categoryColumns,
      categoryConfig
  );

  // Definir asociación hasMany con Product
  Category.associate = function(models) {
      Category.hasMany(models.Product, {
          as: 'Products',
          foreignKey: 'CategoryID' // Suponiendo que 'CategoryID' es la clave foránea en la tabla de Product que hace referencia a la tabla de Category
      });
  };

  return Category;
}

module.exports = categoryData;
