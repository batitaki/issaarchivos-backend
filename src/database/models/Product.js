// models/Product.js

function productData(sequelize, DataTypes) {
    let productTableName = 'Product'; 
  
    let productColumns = {
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
      },
      Price: {
        type: DataTypes.FLOAT,
        allowNull: false
      },
      Image: {
        type: DataTypes.STRING,
        allowNull: true
      }
    };
  
    let productConfig = {
      timestamps: false,
      tableName: 'Product', 
    };
  
    const Product = sequelize.define(
      productTableName,
      productColumns,
      productConfig
    );
  
    return Product;
  }
  
  module.exports = productData;
  