'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => queryInterface.bulkInsert('books',
    [
      {
        isbn: '9788575223253',
        title: 'Construindo aplicativos Android',
        year: '2012',
        pages: 200,
        reader_id: 1,
      },
      {
        isbn: '9788521316558',
        title: 'Testes de lógica',
        year: '2010',
        pages: 191,
        reader_id: 1,
      },
    ], {}),

  down: async (queryInterface) => queryInterface.bulkDelete('books', null, {}),
};