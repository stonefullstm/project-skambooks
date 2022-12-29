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

const getExchangeById = async (id: number): Promise<TExchange> => {
  const exchange = await exchangesModel.findByPk(id, {
    // include: { model: authorsModel, as: 'authors', through: {attributes: []} }
  });
  return exchange as unknown as TExchange;
};

const createExchange = async (exchange: TExchange): Promise<TNewExchange> => {
  const { senderId, receiverId, bookId  } = exchange;
  const result = await exchangesModel.create({
    senderId, receiverId, bookId
  });
  const { sendDate: _, ...exchangeWithoutSendDate } = result.dataValues;
  const newExchange = { ...exchangeWithoutSendDate, sendDate: result.dataValues.sendDate }; 
  return newExchange;
}

const deleteExchange = async (id: number): Promise<number> => {
  const deletedQty = await exchangesModel.destroy({
    where: { id },
  });
  return deletedQty;
}

export default { getAllExchanges, createExchange, deleteExchange, getExchangeById };
