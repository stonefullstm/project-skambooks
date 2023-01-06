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
        password: '$2b$10$6Ab5QDY1hqU2VbUK6Zg.yerYtTyk40JMqlMacLskerSYG9.wARKTO',
        credits: 1,
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
        password: '$2b$10$6Ab5QDY1hqU2VbUK6Zg.yerYtTyk40JMqlMacLskerSYG9.wARKTO',
        credits: 1,
      },
      {
        name: 'João Almeida',
        address: 'Av. das Mangueiras',
        number: 225,
        complement: 'Prox.Hospital das Clínicas',
        zip_code: '68100000',
        district: 'Aldeia',
        city: 'Santarém',
        state: 'PA',
        phone: '93991001111',
        email: 'jalmeida@test.com',
        password: '$2b$10$6Ab5QDY1hqU2VbUK6Zg.yerYtTyk40JMqlMacLskerSYG9.wARKTO',
        credits: 1,
      }
      
    ], {}),

  down: async (queryInterface) => queryInterface.bulkDelete('readers', null, {}),
};
