'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => queryInterface.bulkInsert('leitores',
    [
      {
        nome: 'João Carlos',
        endereco: 'Rua das Flores',
        numero: 25,
        complemento: 'Entre Ruas A e B',
        cep: '68000000',
        bairro: 'Centro',
        cidade: 'Santarém',
        estado: 'PA',
        telefone: '93991000000',
        email: 'jotac@test.com',
        senha: '123456',
        creditos: 0,
      },
      {
        nome: 'José Antônio',
        endereco: 'Rua das Flores',
        numero: 125,
        complemento: 'Entre Ruas B e C',
        cep: '68000000',
        bairro: 'Centro',
        cidade: 'Santarém',
        estado: 'PA',
        telefone: '93991000001',
        email: 'jotaantonio@test.com',
        senha: '123457',
        creditos: 0,
      },
    ], {}),

  down: async (queryInterface) => queryInterface.bulkDelete('leitores', null, {}),
};
