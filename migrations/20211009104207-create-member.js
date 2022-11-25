'use strict';
module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable('members', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      name: {
        type: DataTypes.STRING,
      },
      link: {
        type: DataTypes.STRING
      },
      pic: {
        type: DataTypes.STRING
      },
      files:{
        type:DataTypes.JSONB
      },
      category:{
        type:DataTypes.ARRAY(DataTypes.STRING)
      },
      email:{
        type:DataTypes.STRING
      },
      extra:{
        type:DataTypes.STRING
      },
      welayat:{
        type:DataTypes.STRING
      },
      body:{
        type:DataTypes.JSONB
      },
      main:{
        type:DataTypes.STRING
      },
      address:{
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
    await queryInterface.dropTable('members');
  }
};