'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class News_tags extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  News_tags.init({
    uuid:{
      type:DataTypes.UUID,
      defaultValue:DataTypes.UUIDV4
    },
    RU: DataTypes.STRING,
    TM: DataTypes.STRING,
    EN: DataTypes.STRING
  }, {
    sequelize,
    tableName:"news_tags",
    modelName: 'News_tags',
  });
  return News_tags;
};