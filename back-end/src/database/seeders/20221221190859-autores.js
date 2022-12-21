'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => queryInterface.bulkInsert('autores',
    [
      {
        nome: 'Jonathan Stark',
      },
      {
        nome: 'Brian Jepson',
      },
      {
        nome: 'Suzana Paz Enriquez',
      }
    ], {}),

  down: async (queryInterface) => queryInterface.bulkDelete('autores', null, {}),
};