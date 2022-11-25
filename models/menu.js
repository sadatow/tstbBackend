'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Menu extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Menu.init({
    body: DataTypes.JSONB,
    header: DataTypes.JSONB,
    pic:DataTypes.ARRAY(DataTypes.STRING),
    files: DataTypes.JSONB
  }, {
    sequelize,
    tableName:"menu",
    modelName: 'Menu',
  });
  return Menu;
};