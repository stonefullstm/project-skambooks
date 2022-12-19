'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('autores_livros', {
      idLivro: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'livros',
          key: 'id',
        },
        field: 'id_livro',
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
    await queryInterface.dropTable('autores_livros');
  },
};
