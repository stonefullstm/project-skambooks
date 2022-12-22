import Autor from '../database/models/autores.model';
import Livro from '../database/models/livros.model';
import { TLivro } from '../types';

const getAll = async (): Promise<TLivro[]> => {
  const livros = await Livro.findAll({
    include: { model: Autor, as: 'autores' },
  });
  return livros as TLivro[];
};

const getIdLivro = async (id: number): Promise<TLivro[]> => {
  const livros = await Livro.findOne({
    include: { model: Autor, as: 'autores' },
    where: { id },
  });
  return livros as unknown as TLivro[];
};

const deleteLivro = async (id: number): Promise<TLivro[]> => {
  const leitor = await Livro.destroy({
    where: { id },
  });
  return leitor as unknown as TLivro[];
};

export default { getAll, deleteLivro, getIdLivro };