import { INTEGER, Model, STRING } from 'sequelize';
import db from '.';

class Author extends Model {
  declare id: number;
  declare nome: string;
}

Author.init({
  id: {
    type: INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: STRING(255),
    allowNull: false,
  },
}, 
{
  // ... Outras configs
  underscored: true,
  sequelize: db,
  modelName: 'authors',
  timestamps: false,
});

export default Author;