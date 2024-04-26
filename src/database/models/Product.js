// models/Product.js
function productData(sequelize, DataTypes) {
    const Product = sequelize.define('Product', {
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
        Care: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        CategoryID: {
            type: DataTypes.INTEGER,
        }
    }, {
        timestamps: false,
        tableName: 'Product',
    });

    Product.associate = function(models) {
        Product.belongsTo(models.Category, {
            as: 'Category',
            foreignKey: 'CategoryID',
        });

        Product.belongsToMany(models.Size, {
            through: 'ProductSize',
            as: 'Sizes',
            foreignKey: 'ProductID'
        });

        Product.hasMany(models.Media, {
            as: 'Media',
            foreignKey: 'ProductID',
        });
    };

    return Product;
}

module.exports = productData;
