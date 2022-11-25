'use strict';

module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable('provinces', {
    id:{
      type:DataTypes.INTEGER,
      allowNull:true,
      autoIncrement:true,
      primaryKey:true,
    } ,   
      place: {
        type: DataTypes.JSONB
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
    await queryInterface.dropTable('provinces');
  }
};