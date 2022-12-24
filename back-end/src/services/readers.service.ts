import * as bcrypt from 'bcrypt';
import readersModel from '../database/models/readers.model';
import { TReader, TUser } from '../types';

const getReaderById = async (id: number): Promise<TReader[]> => {
  const reader = await readersModel.findOne({
    where: { id }
  });
  return reader as unknown as TReader[];
};


const getReaderByEmail = async ( email: string ): Promise<TUser> => {
  const user = await readersModel.findOne({ where: { email } });
  return { id: user?.dataValues.id, email: user?.dataValues.email, password: user?.dataValues.password };
};

const insertReader = async (body: TReader): Promise<TReader[]> => {
  const { name, address, number, complement, zipCode, district, city, state, phone, email, password, credits } = body;
  const salt = bcrypt.genSaltSync();
  const hashPassword = bcrypt.hashSync(password, salt);
  const result = await readersModel.create({
    name, address, number, complement, 
    zipCode, district, city, state, phone, email, 
    password: hashPassword, credits});
  return result as unknown as TReader[];
};

const updateReader = async (body: TReader, id: number): Promise<TReader[]> => {
  const { name, address, number, complement, zipCode, district, city, state, phone, email, password, credits } = body;
  const result = await readersModel.update({name, address, number, complement, 
    zipCode, district, city, state, phone, email, password, credits},
    {
      where: { id },
    });
  return result as unknown as TReader[];
};
const deleteReader = async (id: number): Promise<TReader[]> => {
  const reader = await readersModel.destroy({
    where: { id }
  });
  return reader as unknown as TReader[];
};

export default { getReaderById, insertReader, getReaderByEmail, updateReader, deleteReader };
