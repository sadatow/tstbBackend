'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Login extends Model {
    static associate(models) {
    }
  };
  Login.init({
    name: DataTypes.STRING,
    password: DataTypes.STRING,
    refresh:DataTypes.STRING,
    otp:DataTypes.STRING,
    mail:DataTypes.STRING,
  }, {
    sequelize,
    tableName:"login",
    modelName: 'Login',
  });
  return Login;
};