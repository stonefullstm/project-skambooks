'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => queryInterface.bulkInsert('authors',
    [
      {
        name: 'Jonathan Stark',
      },
      {
        name: 'Brian Jepson',
      },
      {
        name: 'Suzana Paz Enriquez',
      },
      {
        name: 'J. Mark G. Williams',
      },
      {
        name: 'Danny Penman',
      },
      {
        name: 'Robert G. Hagstrom',
      }
    ], {}),

  down: async (queryInterface) => queryInterface.bulkDelete('authors', null, {}),
};