import * as bcrypt from 'bcrypt';
import readersModel from '../database/models/readers.model';
import { TReader, TUser } from '../types';

const getReaderById = async (id: number): Promise<TReader> => {
  const reader = await readersModel.findByPk(id, {
    attributes: { exclude: ['password'] },
  });
  return reader as unknown as TReader;
};


const getReaderByEmail = async ( email: string ): Promise<TUser> => {
  const user = await readersModel.findOne({ where: { email } });
  return { id: user?.dataValues.id, email: user?.dataValues.email, password: user?.dataValues.password };
};

const createReader = async (body: TReader): Promise<TReader[]> => {
  const { name, address, number, complement, zipCode, district, city, state, phone, email, password, credits } = body;
  const salt = bcrypt.genSaltSync();
  const hashPassword = bcrypt.hashSync(password, salt);
  const result = await readersModel.create({
    name, address, number, complement, 
    zipCode, district, city, state, phone, email, 
    password: hashPassword, credits});
  return result as unknown as TReader[];
};

const updateReader = async (body: TReader, id: number): Promise<number> => {
  const { name, address, number, complement, zipCode, district, city, state, phone, email, credits } = body;
  const [updatedQty] = await readersModel.update({name, address, number, complement, 
    zipCode, district, city, state, phone, email, credits},
    {
      where: { id },
    });
  return updatedQty;
};

const deleteReader = async (id: number): Promise<number> => {
  const deletedQty = await readersModel.destroy({
    where: { id }
  });
  return deletedQty;
};

export default { getReaderById, createReader, getReaderByEmail, updateReader, deleteReader };
