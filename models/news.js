'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class News extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
   
  };
  News.init({
    name: DataTypes.STRING,
    topar:DataTypes.STRING,
    pic: DataTypes.STRING,
    header: DataTypes.JSONB,
    date: DataTypes.JSONB,
    body: DataTypes.JSONB,
    tags:DataTypes.ARRAY(DataTypes.STRING),
    active:DataTypes.STRING
  }, {
    sequelize,
    tableName:"news",
    modelName: 'News',
  });
  return News;
};