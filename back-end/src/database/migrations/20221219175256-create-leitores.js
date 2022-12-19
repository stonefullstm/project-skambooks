'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('leitores', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      nome: {
        allowNull: false,
        type: Sequelize.STRING(255),
      },
      endereco: {
        allowNull: false,
        type: Sequelize.STRING(255),
      },
      numero: {
        allowNull: true,
        type: Sequelize.INTEGER,
      },
      complemento: {
        allowNull: true,
        type: Sequelize.STRING(255),
      },
      cep: {
        allowNull: false,
        type: Sequelize.STRING(8),
      },
      bairro: {
        allowNull: false,
        type: Sequelize.STRING(255),
      },
      cidade: {
        allowNull: false,
        type: Sequelize.STRING(255),
      },
      estado: {
        allowNull: false,
        type: Sequelize.STRING(255),
      },
      telefone: {
        allowNull: false,
        type: Sequelize.STRING(11),
      },
      email: {
        allowNull: false,
        type: Sequelize.STRING(255),
      },
      senha: {
        allowNull: false,
        type: Sequelize.STRING(40),
      },
      creditos: {
        allowNull: false,
        type: Sequelize.INTEGER,
      }
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('leitores');
  },
};
