import { Request, Response } from 'express';
import livrosService from '../services/livros.service';
import statusCodes from '../statusCodes';

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

export default {
  getAll,
  deleteLivro ,
};