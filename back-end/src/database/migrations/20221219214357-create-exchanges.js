'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('exchanges', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      senderId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'readers',
          key: 'id',
        },
        field: 'sender_id',
      },
      receiverId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'readers',
          key: 'id',
        },
        field: 'receiver_id',
      },
      bookId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'books',
          key: 'id',
        },
        field: 'book_id',
      },
      sendDate: {
        allowNull: false,
        type: Sequelize.DATE,
        field: 'send_date',
      },
      receiveDate: {
        allowNull: true,
        type: Sequelize.DATE,
        field: 'receive_date',
      },
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('exchanges');
  },
};
