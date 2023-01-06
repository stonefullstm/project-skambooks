'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => queryInterface.bulkInsert('authors_books',
    [
      {
        book_id: 1,
        author_id: 1,
      },
      {
        book_id: 1,
        author_id: 2,
      },
      {
        book_id: 2,
        author_id: 3,
      },
      {
        book_id: 3,
        author_id: 4,
      },
      {
        book_id: 3,
        author_id: 5,
      },
      {
        book_id: 4,
        author_id: 6,
      },
    ], {}),

  down: async (queryInterface) => queryInterface.bulkDelete('authors_books', null, {}),
};