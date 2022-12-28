'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('authors_books', {
      bookId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'books',
          key: 'id',
        },
        onDelete: 'CASCADE',
        field: 'book_id',
      },
      authorId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'authors',
          key: 'id',
        },
        onDelete: 'CASCADE',
        field: 'author_id',
      },
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('authors_books');
  },
};
