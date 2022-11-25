'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Newspaper extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
    
  };
  Newspaper.init({
    uuid:{
      type:DataTypes.UUID,
      defaultValue:DataTypes.UUIDV4
    },
    name: {
      type:DataTypes.JSONB,
      },
    filename:{
      type:DataTypes.STRING,
    },
    date: {
      type:DataTypes.STRING,
      allowNull:false},
    logo:{
      type:DataTypes.STRING,
    },
    active:{
      type:DataTypes.STRING
    }
    }, 
  {
    sequelize,
    tableName:"newspapers",
    modelName: 'Newspaper',
  });
  return Newspaper;
};