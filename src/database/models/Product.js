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
        },
        CategoryID: {
            type: DataTypes.INTEGER,
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
    
    Product.associate = function (models) {
      Product.belongsTo(models.Category, {
        as: 'Category',
        foreignKey: 'CategoryID',
      });

      Product.hasMany(models.Media, {
        as: 'Media',
        foreignKey: 'ProductID',
      });
    };
    return Product;
}

module.exports = productData;
