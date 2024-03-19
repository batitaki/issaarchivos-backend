// models/MediaColor.js

function mediaColorData(sequelize, DataTypes) {
    let mediaColorTableName = 'MediaColor';
  
    let mediaColorColumns = {
      ID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      ColorID: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      MediaID: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    };
  
    let mediaColorConfig = {
      timestamps: false,
      tableName: 'MediaColor',
    };
  
    const MediaColor = sequelize.define(mediaColorTableName, mediaColorColumns, mediaColorConfig);
  
    return MediaColor;
  }
  
  module.exports = mediaColorData;
  