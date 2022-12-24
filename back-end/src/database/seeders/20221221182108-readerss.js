'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => queryInterface.bulkInsert('readers',
    [
      {
        name: 'João Carlos',
        address: 'Rua das Flores',
        number: 25,
        complement: 'Entre Ruas A e B',
        zip_code: '68000000',
        district: 'Centro',
        city: 'Santarém',
        state: 'PA',
        phone: '93991000000',
        email: 'jotac@test.com',
        password: '123456',
        credits: 0,
      },
      {
        name: 'José Antônio',
        address: 'Rua das Flores',
        number: 125,
        complement: 'Entre Ruas B e C',
        zip_code: '68000000',
        district: 'Centro',
        city: 'Santarém',
        state: 'PA',
        phone: '93991000001',
        email: 'jotaantonio@test.com',
        password: '123457',
        credits: 0,
      },
    ], {}),

  down: async (queryInterface) => queryInterface.bulkDelete('readers', null, {}),
};
