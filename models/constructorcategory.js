'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Constructorcategory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Constructor,{foreignKey:"constructorId",as:"constructors",onDelete:"cascade"})
    }
  };
  Constructorcategory.init({
    name: DataTypes.JSONB
  }, {
    sequelize,
    tableName: "constructorcategories",
    modelName: 'Constructorcategory',
  });
  return Constructorcategory;
};