import { Op } from 'sequelize';
import booksModel from '../database/models/books.model';
import exchangesModel from '../database/models/exchanges.model';
import readersModel from '../database/models/readers.model';
import { TExchange, TNewExchange } from '../types';

const getAllExchangesByReader = async (id: number): Promise<TExchange[]> => {
  const exchanges = exchangesModel.findAll({
    where: {
      [Op.or]: [
        { senderId: id },
        { receiverId: id }
      ]
    },
    include: [{ model: readersModel, as: 'sender', attributes: {exclude: ['password']} },
    { model: readersModel, as: 'receiver', attributes: {exclude: ['password']} },
    { model: booksModel, as: 'bookExchanged' },],
    attributes: {exclude: ['senderId', 'receiverId', 'bookId']},
    order: [['sendDate', 'DESC']]
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

const confirmExchange = async (id: number): Promise<number> => {
  const [updatedQty] = await exchangesModel.update({ receiveDate: new Date() },
    { where: { id } });
  return updatedQty;
}

export default { getAllExchangesByReader, 
  createExchange, 
  deleteExchange, 
  getExchangeById, 
  confirmExchange };
