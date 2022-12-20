import { INTEGER, Model, STRING } from 'sequelize';
import db from '.';

class Autor extends Model {
  declare id: number;
  declare nome: string;
}

Autor.init({
  id: {
    type: INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  nome: {
    type: STRING(255),
    allowNull: false,
  },
}, 
{
  // ... Outras configs
  underscored: true,
  sequelize: db,
  modelName: 'autores',
  timestamps: false,
});
// Autor.belongsToMany(Livro, { foreignKey: 'idAutor', as: 'livros',
//  through: {model: AutoresLivros}, otherKey: 'idLivro' });

// Livro.belongsToMany(Autor, { foreignKey: 'idLivro', as: 'autores',
//  through: {model: AutoresLivros}, otherKey: 'idAutor' });
export default Autor;