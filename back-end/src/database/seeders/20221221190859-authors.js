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
      }
    ], {}),

  down: async (queryInterface) => queryInterface.bulkDelete('authors', null, {}),
};