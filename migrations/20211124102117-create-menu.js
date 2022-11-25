'use strict';
module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable('menu', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      body: {
        type: DataTypes.JSONB
      },
      header:{
        type: DataTypes.JSONB
      },
      pic:{
        type:DataTypes.ARRAY(DataTypes.STRING)
      },
      files:{
        type:DataTypes.JSONB
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
    await queryInterface.dropTable('menu');
  }
};