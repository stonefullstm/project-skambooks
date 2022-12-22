const jwt = require('jsonwebtoken');
import { Request, Response } from 'express';
import leitores from '../services/leitores.service';
import statusCodes from '../statusCodes';
require('dotenv/config');

const secret = process.env.JWTSECRET || 'seusecretdetoken';

const getIdLeitor = async ( req: Request, res: Response) => {
  const { id } = req.params;
  const result = await leitores.getIdLeitor(Number(id));
  if (result) {
    return res.status(statusCodes.OK).json(result);
  }
  return res.status(statusCodes.NOT_FOUND).json({ message: 'Leitor not found'});
};

const getLeitorByEmail = async (req: Request, res: Response) => {
  const { email, senha } = req.body;
  const user = await leitores.getLeitorByEmail(email);
  if (!user || user.senha !== senha) {
    return res.status(statusCodes.NOT_FOUND).json({message: 'Usuário not found'});
  };
  const userData = { 
    id: user.id,
    email,
  }; 
  const jwtConfig = {
    expiresIn: '1d',
    algorithm: 'HS256',
  };
  const token = jwt.sign( userData, secret as string, jwtConfig);

  res.status(statusCodes.OK).json({ token });
};

const insertLeitor = async ( req: Request, res: Response) => {
  console.log(req.body);
  
  const result = await leitores.insertLeitor(req.body);
  if (result) {
    return res.status(statusCodes.CREATED).json(req.body);
  }
  return res.status(statusCodes.ERROR).json({ message: 'Error'});
};

const updateLeitor = async ( req: Request, res: Response) => {
  const { id } = req.params;
  const leitor = await leitores.getIdLeitor(Number(id));
  if (!leitor) {
    return res.status(statusCodes.NOT_FOUND).json({ message: 'Leitor not found'});
  }
  const result = await leitores.updateLeitor(req.body, Number(id));
  if (result) {
    return res.status(statusCodes.OK).json(req.body);
  }
  return res.status(statusCodes.ERROR).json({ message: 'Error'});
};

export default { getIdLeitor, insertLeitor, getLeitorByEmail, updateLeitor };
