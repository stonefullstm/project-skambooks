import { INTEGER, Model, STRING } from 'sequelize';
import db from '.';
import Autor from './autores.model';
import Livro from './livros.model';

class AutoresLivros extends Model {
  declare idLivro: number;
  declare idAutor: number;
}

AutoresLivros.init({
  idLivro: {
    type: INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  idAutor: {
    type: INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
}, 
{
  // ... Outras configs
  underscored: true,
  sequelize: db,
  modelName: 'autores_livros',
  timestamps: false,
});

Autor.belongsToMany(Livro, { foreignKey: 'idAutor', as: 'autores_livros',
 through: 'AutoresLivros', otherKey: 'idLivro' });

Livro.belongsToMany(Autor, { foreignKey: 'idLivro', as: 'autores_livros',
 through: 'AutoresLivros', otherKey: 'idAutor' });

export default AutoresLivros;