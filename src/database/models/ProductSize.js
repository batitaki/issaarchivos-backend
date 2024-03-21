// models/ProductSize.js
function productSizeData(sequelize, DataTypes) {
    const ProductSize = sequelize.define('ProductSize', {
        ProductID: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        SizeID: {
            type: DataTypes.INTEGER,
            primaryKey: true
        }
    }, {
        timestamps: false,
        tableName: 'ProductSize',
    });

    return ProductSize;
}

module.exports = productSizeData;
