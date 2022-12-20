import { Request, Response } from 'express';
import livrosService from '../services/livros.service';

const getAll = async (req: Request, res: Response) => {
  const livros = await livrosService.getAll();
  res.status(200).json(livros);
};

export default {
  getAll,
};