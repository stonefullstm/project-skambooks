'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('readers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING(255),
      },
      address: {
        allowNull: false,
        type: Sequelize.STRING(255),
      },
      number: {
        allowNull: true,
        type: Sequelize.INTEGER,
      },
      complement: {
        allowNull: true,
        type: Sequelize.STRING(255),
      },
      zipCode: {
        allowNull: false,
        type: Sequelize.STRING(8),
        field: 'zip_code',
      },
      district: {
        allowNull: false,
        type: Sequelize.STRING(255),
      },
      city: {
        allowNull: false,
        type: Sequelize.STRING(255),
      },
      state: {
        allowNull: false,
        type: Sequelize.STRING(255),
      },
      phone: {
        allowNull: false,
        type: Sequelize.STRING(11),
      },
      email: {
        allowNull: false,
        unique: true,
        type: Sequelize.STRING(255),
      },
      password: {
        allowNull: false,
        type: Sequelize.STRING(255),
      },
      credits: {
        allowNull: true,
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      newReader: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
        defaultValue: true,
        field: 'new_reader',
      }
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('readers');
  },
};
