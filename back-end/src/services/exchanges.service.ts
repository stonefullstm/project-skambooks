import { Op, Transaction } from 'sequelize';
import sequelize from '../database/models';
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

const getAllExchangesByBook = async (id: number): Promise<TExchange[]> => {
  const exchanges = await exchangesModel.findAll({
    where: {
        bookId: id
    },
  });
  return exchanges;
}

const getExchangeById = async (id: number): Promise<TExchange> => {
  const exchange = await exchangesModel.findByPk(id, {
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
  return sequelize.transaction(async (t: Transaction) => {
    const [updatedQty] = await exchangesModel.update({ receiveDate: new Date() },
      { where: { id } });
    const exchange = await exchangesModel.findByPk(id);
    const updatedExchange = exchange as unknown as TExchange;
    await readersModel.update(
      { credits: sequelize.literal('credits + 1')},
      {
        where: { id: updatedExchange.senderId },
      }
    );
    await readersModel.update(
      { credits: sequelize.literal('credits - 1')},
      {
        where: { id: updatedExchange.receiverId },
      }
    );
    await booksModel.update(
      { readerId: updatedExchange.receiverId },
      {
        where: { id: updatedExchange.bookId },
      }
    )
    return updatedQty;
  });
}

export default { getAllExchangesByReader,
  getAllExchangesByBook,
  createExchange, 
  deleteExchange, 
  getExchangeById, 
  confirmExchange };
