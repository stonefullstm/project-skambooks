import Autor from '../database/models/autores.model';
import Livro from '../database/models/livros.model';
import AutoresLivros from '../database/models/autores-livros.model';
import { TAutor, Tautores} from '../types';
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

const createLivro = async (body: TLivro): Promise<TLivro[]> => {
  const { isbn, titulo, ano, paginas, idLeitor } = body;
  const livro = await Livro.create({
    isbn,
    titulo,
    ano,
    paginas,
    idLeitor,
  });
  return livro as unknown as TLivro[];
};

const createAutor = async (body: TAutor): Promise<TAutor[]> => {
  const {  nome } = body;
  const autor = await Autor.create({
     nome,
  });
  return autor as unknown as TAutor[];
};

const createAutorLivro = async (idLivro: number, idAutor: number): Promise<Tautores[]> => {
  const autores = await AutoresLivros.create({
    idLivro, idAutor,
  });
  return autores as unknown as Tautores[];
};

export default { getAll, deleteLivro, getIdLivro, createLivro, createAutor, createAutorLivro };
