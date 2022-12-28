import { INTEGER, Model } from 'sequelize';
import db from '.';

class AuthorsBooks extends Model {
  declare bookId: number;
  declare authorId: number;
}

AuthorsBooks.init({
  bookId: {
    type: INTEGER,
    allowNull: false,
    // primaryKey: true,
  },
  authorId: {
    type: INTEGER,
    allowNull: false,
    // primaryKey: true,
  },
}, 
{
  // ... Outras configs
  underscored: true,
  sequelize: db,
  modelName: 'authors_books',
  timestamps: false,
});

export default AuthorsBooks;