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

const insertLeitor = async ( req: Request, res: Response) => {
  console.log(req.body);
  
  const result = await leitores.insertLeitor(req.body);
  if (result) {
    return res.status(statusCodes.CREATED).json(req.body);
  }
  return res.status(statusCodes.ERROR).json({ message: 'Error'});
};
export default { getIdLeitor, insertLeitor };
