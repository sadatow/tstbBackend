'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Banner extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Constructor,{foreignKey:"bannerId",as:"constructor"})
    }
    
  };
  Banner.init({
    uuid:{
      type:DataTypes.UUID,
      defaultValue:DataTypes.UUIDV4
    },
    banner: DataTypes.JSONB,
   
  }, {
    sequelize,
    tableName:"banners",
    modelName: 'Banners',
  });
  return Banner;
};