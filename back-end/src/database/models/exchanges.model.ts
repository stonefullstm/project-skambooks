import { DATE, INTEGER, Model } from 'sequelize';
import db from '.';
import Book from './books.model';
import Reader from './readers.model';

class Exchange extends Model {
  declare id: number;
  declare senderId: number;
  declare receiverId: number;
  declare bookId: number;
  declare sendDate: string;
  declare receiveDate: string;
}

Exchange.init({
  id: {
    type: INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
  },
  senderId: {
    type: INTEGER,
    allowNull: false,
  },
  receiverId: {
    type: INTEGER,
    allowNull: false,
  },
  bookId: {
    type: INTEGER,
    allowNull: false,
  },
  sendDate: {
    type: DATE,
    allowNull: true,
    defaultValue: new Date(),
  },
  receiveDate: {
    type: DATE,
    allowNull: true,
  },
}, 
{
  // ... Outras configs
  underscored: true,
  sequelize: db,
  modelName: 'exchanges',
  timestamps: false,
});
Reader.hasMany(Exchange, { foreignKey: 'senderId', as: 'sender' });
Exchange.belongsTo(Reader, { foreignKey: 'senderId', as: 'sender' });

Reader.hasMany(Exchange, { foreignKey: 'receiverId', as: 'receiver' });
Exchange.belongsTo(Reader, { foreignKey: 'receiverId', as: 'receiver' });

Book.hasMany(Exchange, { foreignKey: 'bookId', as: 'bookExchanged' });
Exchange.belongsTo(Book, { foreignKey: 'bookId', as: 'bookExchanged' });

export default Exchange;