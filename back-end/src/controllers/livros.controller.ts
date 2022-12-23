import { Request, Response } from 'express';
import livrosService from '../services/livros.service';
import statusCodes from '../statusCodes';
import { TAutor } from '../types';

const getAll = async (req: Request, res: Response) => {
  const livros = await livrosService.getAll();
  res.status(statusCodes.OK).json(livros);
};

const deleteLivro = async ( req: Request, res: Response) => {
  const { id } = req.params;
  const result = await livrosService.getIdLivro(Number(id));
  if (!result) {
    return res.status(statusCodes.NOT_FOUND).json({ message: 'Livro not found'});
  }
  const leitor = await livrosService.deleteLivro(Number(id));
  if (leitor) {
    return res.status(statusCodes.OK).json({ message: `Delete livro: ${id}`});
  };
  return res.status(statusCodes.ERROR).json({ message: 'Error'});
  
};

const createLivro = async (req: Request, res: Response) => {
  const { isbn, titulo, ano, paginas, idLeitor, autores } = req.body;
  await livrosService.createLivro({isbn, titulo, ano, paginas, idLeitor, autores});
  const idLivro = (await livrosService.getAll()).length;
  const promisse = await autores.map((i: TAutor) => livrosService.createAutor(i));
  const a = await promisse.map((item: { id: number; }) => livrosService.createAutorLivro(idLivro, item.id));
  await Promise.all(a);
  return res.status(statusCodes.CREATED).json(req.body);
};
  
export default {
  getAll,
  deleteLivro ,
  createLivro,
};