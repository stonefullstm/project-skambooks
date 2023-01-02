import { Request, Response } from 'express';
import exchangesService from '../services/exchanges.service';
import statusCodes from '../statusCodes';

const getAllExchangesByReader = async (req: Request, res: Response) => {
  const { id } = req.body.user;
  const exchanges = await exchangesService.getAllExchangesByReader(id);
  res.status(statusCodes.OK).json(exchanges);
};

const getExchangeById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await exchangesService.getExchangeById(Number(id));
  if (result) {
    return res.status(statusCodes.OK).json(result);
  }
  return res.status(statusCodes.NOT_FOUND).json({ message: 'Exchange not found'});
}

const createExchange = async (req: Request, res: Response) => {
  const { receiverId, bookId } = req.body;
  const { id: senderId } = req.body.user;
  const newExchange = await exchangesService.createExchange({ senderId, receiverId, bookId, sendDate: '', receiveDate: '' });
  return res.status(statusCodes.CREATED).json(newExchange);
}

const deleteExchange = async ( req: Request, res: Response) => {
  const { id } = req.params;
  const { id: readerId } = req.body.user;
  const result = await exchangesService.getExchangeById(Number(id));
  if (!result) {
    return res.status(statusCodes.NOT_FOUND).json({ message: 'Exchange not found'});
  }
  const exchange = await exchangesService.deleteExchange(Number(id));
  if (exchange) {
    return res.status(statusCodes.OK).json({ message: `Exchange deleted: ${id}`});
  };
  return res.status(statusCodes.ERROR).json({ message: 'Error'});
  
};

export default { getAllExchangesByReader, createExchange, deleteExchange, getExchangeById };
