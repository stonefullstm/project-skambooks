'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => queryInterface.bulkInsert('livros',
    [
      {
        isbn: '9788575223253',
        titulo: 'Construindo aplicativos Android',
        ano: '2012',
        paginas: 200,
        id_leitor: 1,
      },
      {
        isbn: '9788521316558',
        titulo: 'Testes de lógica',
        ano: '2010',
        paginas: 191,
        id_leitor: 1,
      },
    ], {}),

  down: async (queryInterface) => queryInterface.bulkDelete('livros', null, {}),
};