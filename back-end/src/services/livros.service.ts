import Autor from '../database/models/autores.model';
import Livro from '../database/models/livros.model';
import { TLivro } from '../types';

const getAll = async (): Promise<TLivro[]> => {
  const livros = await Livro.findAll({
    include: { model: Autor, as: 'autores' },
  });
  return livros as TLivro[];
};

export default { getAll };