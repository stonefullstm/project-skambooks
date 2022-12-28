import exchangesModel from '../database/models/exchanges.model';
import readersModel from '../database/models/readers.model';
import { TExchange, TNewExchange } from '../types';

const getAllExchanges = async (): Promise<TExchange[]> => {
  const exchanges = exchangesModel.findAll({
    include: [{ model: readersModel, as: 'sender', attributes: {exclude: ['password']} },
    { model: readersModel, as: 'receiver', attributes: {exclude: ['password']} },],
    attributes: {exclude: ['senderId', 'receiverId']}
  });
  return exchanges;
}

const createExchange = async (exchange: TExchange): Promise<TNewExchange> => {
  const { senderId, receiverId, bookId  } = exchange;
  const newExchange = await exchangesModel.create({
    senderId, receiverId, bookId
  });
  const { dataValues } = newExchange;
  const createdExchange = { 
    id: dataValues.id,
    senderId: dataValues.senderId,
    receiverId: dataValues.receiverId,
    bookId: dataValues.bookId,
    sendDate: dataValues.sendDate,
    receiveDate: dataValues.receiveDate, 
  };
  return createdExchange;
}

export default { getAllExchanges, createExchange };
