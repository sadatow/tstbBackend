'use strict';
module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable('events', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      uuid:{
        type:DataTypes.UUID,
        defaultValue:DataTypes.UUIDV4
      },
      pic: {
        type: DataTypes.STRING
      },
      header: {
        type: DataTypes.JSONB
      },
      title: {
        type: DataTypes.JSONB
      },
      date: {
        type: DataTypes.STRING
      },
      body: {
        type: DataTypes.JSONB
      },
      tags:{
        type:DataTypes.ARRAY(DataTypes.STRING)
      },
      topar:{
        type:DataTypes.STRING
      },
      active: {
        type:DataTypes.STRING
      },
      name:{
        type:DataTypes.STRING
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
    await queryInterface.dropTable('events');
  }
};