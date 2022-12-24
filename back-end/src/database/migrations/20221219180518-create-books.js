'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('books', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      isbn: {
        allowNull: false,
        type: Sequelize.STRING(13),
      },
      title: {
        allowNull: false,
        type: Sequelize.STRING(255),
      },
      year: {
        allowNull: false,
        type: Sequelize.STRING(4),
      },
      pages: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      readerId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'readers',
          key: 'id',
        },
        field: 'reader_id',
      },
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('books');
  },
};
