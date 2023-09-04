'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn(
      "login",
      "refresh",
      {type:Sequelize.STRING}
    )
    await queryInterface.addColumn(
      "login",
      "otp",
      {type:Sequelize.STRING}
    )
    await queryInterface.addColumn(
      "login",
      "mail",
      {type:Sequelize.STRING,defaultValue:"rustamsadatov0@gmail.com"}
    )
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
