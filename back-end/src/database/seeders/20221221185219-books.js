'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => queryInterface.bulkInsert('books',
    [
      {
        isbn: '9788575223253',
        title: 'Construindo aplicativos Android',
        year: '2012',
        pages: 200,
        reader_id: 2,
      },
      {
        isbn: '9788521316558',
        title: 'Testes de lógica',
        year: '2010',
        pages: 191,
        reader_id: 3,
      },
      {
        isbn: '9788543101873',
        title: 'Atenção plena - Mindfullness',
        year: '2015',
        pages: 207,
        reader_id: 1,
      },
      {
        isbn: '9788557173064',
        title: 'O jeito Warren Buffet de investir',
        year: '2019',
        pages: 295,
        reader_id: 1,
      }
    ], {}),

  down: async (queryInterface) => queryInterface.bulkDelete('books', null, {}),
};