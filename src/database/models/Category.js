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

  return Category;
}

module.exports = categoryData;
