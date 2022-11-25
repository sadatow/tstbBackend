'use strict';
module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable('constructors', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      name: {
        type: DataTypes.JSONB
      },
      header: {
        type: DataTypes.JSONB
      },
      body: {
        type: DataTypes.JSONB
      },
      page: {
        type: DataTypes.STRING
      },
      pic:{
        type:DataTypes.ARRAY(DataTypes.STRING)
      },
      files:{
        type:DataTypes.JSONB
      },
      constructorId:{
        type: DataTypes.INTEGER
      },
      bannerId:{
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
    await queryInterface.dropTable('constructors');
  }
};