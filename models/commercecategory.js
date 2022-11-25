'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CommerceCategory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Commerce,{foreignKey:"commerceId",as:"commerce",onDelete:"cascade"})
    }
  };
  CommerceCategory.init({
    name: DataTypes.JSONB
  },

  {
    sequelize,
    tableName:"commerce_category",
    modelName: 'CommerceCategory',
  });
  return CommerceCategory;
};