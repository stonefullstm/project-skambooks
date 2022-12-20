import { INTEGER, Model } from 'sequelize';
import db from '.';

class AutoresLivros extends Model {
  declare idLivro: number;
  declare idAutor: number;
}

AutoresLivros.init({
  idLivro: {
    type: INTEGER,
    allowNull: false,
    // primaryKey: true,
  },
  idAutor: {
    type: INTEGER,
    allowNull: false,
    // primaryKey: true,
  },
}, 
{
  // ... Outras configs
  underscored: true,
  sequelize: db,
  modelName: 'autores_livros',
  timestamps: false,
});

// Autor.belongsToMany(Livro, { foreignKey: 'idAutor', as: 'livros',
//  through: {model: AutoresLivros}, otherKey: 'idLivro' });

// Livro.belongsToMany(Autor, { foreignKey: 'idLivro', as: 'autores',
//  through: {model: AutoresLivros}, otherKey: 'idAutor' });

export default AutoresLivros;