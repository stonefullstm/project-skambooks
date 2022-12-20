import { INTEGER, Model, STRING } from 'sequelize';
import db from '.';

class Leitor extends Model {
  declare id: number;
  declare nome: string;
  declare endereco: string;
  declare numero: string;
  declare complemento: string;
  declare cep: string;
  declare bairro: string;
  declare cidade: string;
  declare estado: string;
  declare telefone: string;
  declare email: string;
  declare senha: string;
  declare creditos: number;
}

Leitor.init({
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: INTEGER,
  },
  nome: {
    allowNull: false,
    type: STRING(255),
  },
  endereco: {
    allowNull: false,
    type: STRING(255),
  },
  numero: {
    allowNull: true,
    type: INTEGER,
  },
  complemento: {
    allowNull: true,
    type: STRING(255),
  },
  cep: {
    allowNull: false,
    type: STRING(8),
  },
  bairro: {
    allowNull: false,
    type: STRING(255),
  },
  cidade: {
    allowNull: false,
    type: STRING(255),
  },
  estado: {
    allowNull: false,
    type: STRING(255),
  },
  telefone: {
    allowNull: false,
    type: STRING(11),
  },
  email: {
    allowNull: false,
    type: STRING(255),
  },
  senha: {
    allowNull: false,
    type: STRING(40),
  },
  creditos: {
    allowNull: false,
    type: INTEGER,
  }
},
{
  // ... Outras configs
  underscored: true,
  sequelize: db,
  modelName: 'leitores',
  timestamps: false,
});

export default Leitor;
