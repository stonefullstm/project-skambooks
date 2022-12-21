'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => queryInterface.bulkInsert('autores_livros',
    [
      {
        id_livro: 1,
        id_autor: 1,
      },
      {
        id_livro: 1,
        id_autor: 2,
      },
      {
        id_livro: 2,
        id_autor: 3,
      }
    ], {}),

  down: async (queryInterface) => queryInterface.bulkDelete('autores_livros', null, {}),
};