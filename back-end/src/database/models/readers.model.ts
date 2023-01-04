import { BOOLEAN, INTEGER, Model, STRING } from 'sequelize';
import db from '.';

class Reader extends Model {
  declare id: number;
  declare name: string;
  declare address: string;
  declare number: string;
  declare complement: string;
  declare zipCode: string;
  declare district: string;
  declare city: string;
  declare state: string;
  declare phone: string;
  declare email: string;
  declare password: string;
  declare credits: number;
  declare newReader: boolean;
}

Reader.init({
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: INTEGER,
  },
  name: {
    allowNull: false,
    type: STRING(255),
  },
  address: {
    allowNull: false,
    type: STRING(255),
  },
  number: {
    allowNull: true,
    type: INTEGER,
  },
  complement: {
    allowNull: true,
    type: STRING(255),
  },
  zipCode: {
    allowNull: false,
    type: STRING(8),
    field: 'zip_code',
  },
  district: {
    allowNull: false,
    type: STRING(255),
  },
  city: {
    allowNull: false,
    type: STRING(255),
  },
  state: {
    allowNull: false,
    type: STRING(255),
  },
  phone: {
    allowNull: false,
    type: STRING(11),
  },
  email: {
    allowNull: false,
    type: STRING(255),
  },
  password: {
    allowNull: false,
    type: STRING(255),
  },
  credits: {
    allowNull: true,
    type: INTEGER,
    defaultValue: 0,
  },
  newReader: {
    allowNull: true,
    type: BOOLEAN,
    defaultValue: 1,
  }
},
{
  // ... Outras configs
  underscored: true,
  sequelize: db,
  modelName: 'readers',
  timestamps: false,
});

export default Reader;
