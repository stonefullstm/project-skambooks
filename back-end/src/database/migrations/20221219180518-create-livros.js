'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('livros', {
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
      titulo: {
        allowNull: false,
        type: Sequelize.STRING(255),
      },
      ano: {
        allowNull: false,
        type: Sequelize.STRING(4),
      },
      paginas: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      idLeitor: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'leitores',
          key: 'id',
        },
        field: 'id_leitor',
      },
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('livros');
  },
};
