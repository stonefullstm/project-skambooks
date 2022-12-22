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
        onDelete: 'CASCADE',
        field: 'id_livro',
      },
      idAutor: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'autores',
          key: 'id',
        },
        field: 'id_autor',
      },
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('autores_livros');
  },
};
