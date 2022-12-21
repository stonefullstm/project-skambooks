import { Request, Response } from 'express';
import livrosService from '../services/livros.service';
import statusCodes from '../statusCodes';

const getAll = async (req: Request, res: Response) => {
  const livros = await livrosService.getAll();
  res.status(statusCodes.OK).json(livros);
};

export default {
  getAll,
};