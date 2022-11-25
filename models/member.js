'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Member extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Member.init({
    
    name:DataTypes.STRING,
    link: DataTypes.STRING,
    pic: DataTypes.STRING,
    body:DataTypes.JSONB,
    files:DataTypes.JSONB,
    category:DataTypes.ARRAY(DataTypes.STRING),
    email:DataTypes.STRING,
    extra:DataTypes.STRING,
    welayat:DataTypes.STRING, 
    main:DataTypes.STRING,
    address:DataTypes.JSONB
  }, {
    sequelize,
    tableName:"members",
    modelName: 'Member',
  });
  return Member;
};