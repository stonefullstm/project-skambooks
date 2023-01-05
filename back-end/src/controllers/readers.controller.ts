const jwt = require('jsonwebtoken');
import * as bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import readersService from '../services/readers.service';
import statusCodes from '../statusCodes';
require('dotenv/config');

const secret = process.env.JWTSECRET || 'seusecretdetoken';

const getReaderById = async ( req: Request, res: Response) => {
  const { id } = req.body.user;
  const result = await readersService.getReaderById(Number(id));
  if (result) {
    return res.status(statusCodes.OK).json(result);
  }
  return res.status(statusCodes.NOT_FOUND).json({ message: 'Reader not found'});
};

const getAllReaders = async (req: Request, res: Response) => {
  const result = await readersService.getAllReaders();
  if (!result) {
    return res.status(statusCodes.NOT_FOUND).json({ message: 'Readers not found'});
  }
  return res.status(statusCodes.OK).json(result);
}

const getReaderByEmail = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await readersService.getReaderByEmail(email);
  
  if (!user || !user.id) {
    return res.status(statusCodes.NOT_FOUND).json({message: 'User not found'});
  };
  if (!bcrypt.compareSync(password, user.password) ) {
    return res.status(statusCodes.NOT_FOUND).json({message: 'Invalid password'});
  }
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

const createReader = async ( req: Request, res: Response) => {
  const { email } = req.body;
  const user = await readersService.getReaderByEmail(email);
  if (user && user.email) {
    return res.status(statusCodes.BAD_REQUEST).json({ message: 'E-mail already exists'});
  }
  const result = await readersService.createReader(req.body);
  
  if (result) {
    return res.status(statusCodes.CREATED).json(req.body);
  }
  return res.status(statusCodes.ERROR).json({ message: 'Error'});
};

const updateReader = async ( req: Request, res: Response) => {
  const { id } = req.body.user;
  const reader = await readersService.getReaderById(Number(id));
  if (!reader) {
    return res.status(statusCodes.NOT_FOUND).json({ message: 'Reader not found'});
  }
  const updatedQty = await readersService.updateReader(req.body, Number(id));
  if (updatedQty) {
    return res.status(statusCodes.OK).json({ id, ...req.body });
  }
  return res.status(statusCodes.ERROR).json({ message: 'Error'});
};

const deleteReader = async ( req: Request, res: Response) => {
  const { id } = req.body.user;
  const result = await readersService.getReaderById(Number(id));
  if (!result) {
    return res.status(statusCodes.NOT_FOUND).json({ message: 'Reader not found'});
  }
  const reader = await readersService.deleteReader(Number(id));
  if (reader) {
    return res.status(statusCodes.OK).json({ message: `Reader deleted: ${id}`});
  };
  return res.status(statusCodes.ERROR).json({ message: 'Error'});
  
};

export default { getReaderById,
  getAllReaders, 
  createReader, 
  getReaderByEmail, 
  updateReader, 
  deleteReader };
