import { DATE } from 'sequelize';
import { INTEGER, Model, STRING } from 'sequelize';
import db from '.';
import Leitor from './leitores.model';
import Livro from './livros.model';

class Trocas extends Model {
  declare id: number;
  declare idRemetente: number;
  declare idDestinatario: number;
  declare idLivro: number;
  declare dataEnvio: string;
  declare dataRecebimento: string;
}

Trocas.init({
  id: {
    type: INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
  },
  idRemetente: {
    type: INTEGER,
    allowNull: false,
  },
  idDestinatario: {
    type: INTEGER,
    allowNull: false,
  },
  idLivro: {
    type: INTEGER,
    allowNull: false,
  },
  dataEnvio: {
    type: DATE,
    allowNull: false,
  },
  dataRecebimento: {
    type: DATE,
    allowNull: false,
  },
}, 
{
  // ... Outras configs
  underscored: true,
  sequelize: db,
  modelName: 'trocas',
  timestamps: false,
});
Leitor.hasMany(Trocas, { foreignKey: 'idRemetente', as: 'remetente' });
Trocas.belongsTo(Leitor, { foreignKey: 'idRemetente', as: 'remetente' });

Leitor.hasMany(Trocas, { foreignKey: 'idDestinatario', as: 'destinatario' });
Trocas.belongsTo(Leitor, { foreignKey: 'idDestinatario', as: 'destinatario' });

Livro.hasMany(Trocas, { foreignKey: 'idLivro', as: 'livros-trocados' });
Trocas.belongsTo(Livro, { foreignKey: 'idLivro', as: 'livros-trocados' });

export default Trocas;