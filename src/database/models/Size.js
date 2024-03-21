// models/Size.js
function sizeData(sequelize, DataTypes) {
    const Size = sequelize.define('Size', {
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
    }, {
        timestamps: false,
        tableName: 'Size',
    });

    Size.associate = function(models) {
        Size.belongsToMany(models.Product, {
            through: 'ProductSize', // Nombre de la tabla intermedia
            as: 'Products', // Alias para la relación
            foreignKey: 'SizeID' // Clave foránea en la tabla intermedia
        });
    };

    return Size;
}

module.exports = sizeData;
