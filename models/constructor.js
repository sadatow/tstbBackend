'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Constructor extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Constructorcategory,{foreignKey:"constructorId",as:"category"});
      this.belongsTo(models.Banners,{foreignKey:"bannerId",as:"banner"})
    }
  };
  Constructor.init({
    name: DataTypes.JSONB,
    header:DataTypes.JSONB,
    body: DataTypes.JSONB,
    pic:DataTypes.ARRAY(DataTypes.STRING),
    files:DataTypes.JSONB,
    page:DataTypes.STRING,
    constructorId:DataTypes.INTEGER,
    bannerId:DataTypes.INTEGER
  }, {
    sequelize,
    tableName: "constructors",
    modelName: 'Constructor',
  });
  return Constructor;
};