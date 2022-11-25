'use strict';
module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable('commerce', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      welayat: {
        type: DataTypes.STRING
      },
      name: {
        type: DataTypes.JSONB
      },
      address: {
        type:DataTypes.JSONB
      },
      number: {
        type: DataTypes.STRING
      },
      website: {
        type: DataTypes.STRING
      },
      pic: {
        type: DataTypes.ARRAY(DataTypes.STRING)
      },
      category:{
        type:DataTypes.STRING
      },
      email: {
        type:DataTypes.STRING
      },
      commerceId:{
        type:DataTypes.INTEGER
      },
      
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      }
    });
  },
  down: async (queryInterface, DataTypes) => {
    await queryInterface.dropTable('commerce');
  }
};