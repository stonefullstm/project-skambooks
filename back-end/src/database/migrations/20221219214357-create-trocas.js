'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('trocas', {
      idRementente: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'leitores',
          key: 'id',
        },
        field: 'id_remetente',
      },
      idDestinatario: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'leitores',
          key: 'id',
        },
        field: 'id_destinatario',
      },
      idLivro: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'livros',
          key: 'id',
        },
        field: 'id_livro',
      },
      dataEnvio: {
        allowNull: false,
        type: Sequelize.DATE,
        field: 'data_envio',
      },
      dataRecebimento: {
        allowNull: true,
        type: Sequelize.DATE,
        field: 'data_recebimento',
      },
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('trocas');
  },
};
