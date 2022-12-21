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

export default { getIdLeitor, getLeitorByEmail };
