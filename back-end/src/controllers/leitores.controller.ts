import { Request, Response } from 'express';
import leitores from '../services/leitores.service';
import statusCodes from '../statusCodes';

const getIdLeitor = async ( req: Request, res: Response) => {
  const { id } = req.params;
  const result = await leitores.getIdLeitor(Number(id));
  if (result) {
    return res.status(statusCodes.OK).json(result);
  }
  return res.status(statusCodes.NOT_FOUND).json({ message: 'Leitor not found'});
};

export default { getIdLeitor };
