import { Model, INTEGER, STRING } from 'sequelize';
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

/**
  * `Workaround` para aplicar as associations em TS:
  * Associations 1:N devem ficar em uma das instâncias de modelo
  * */

export default Autor;