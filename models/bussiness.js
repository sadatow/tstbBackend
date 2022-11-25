'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Bussiness extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Bussiness.init({
    body: DataTypes.JSONB,
    header:DataTypes.JSONB,
    files: DataTypes.JSONB
  }, {
    sequelize,
    tableName:"bussiness",
    modelName: 'Bussiness',
  });
  return Bussiness;
};