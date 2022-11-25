'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class License extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  License.init({
    name: DataTypes.JSONB,
    header: DataTypes.JSONB,
    body: DataTypes.JSONB,
    files: DataTypes.JSONB
  }, {
    sequelize,
    tableName:"license",
    modelName: 'License',
  });
  return License;
};