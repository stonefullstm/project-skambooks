import { Request, Response } from 'express';
import exchangesService from '../services/exchanges.service';
import statusCodes from '../statusCodes';

const getAllExchanges = async (req: Request, res: Response) => {
  const exchanges = await exchangesService.getAllExchanges();
  res.status(statusCodes.OK).json(exchanges);
};

const createExchange = async (req: Request, res: Response) => {
  const { receiverId, bookId } = req.body;
  const { id: senderId } = req.body.user;
  const newExchange = await exchangesService.createExchange({ senderId, receiverId, bookId, sendDate: '', receiveDate: '' });
  return res.status(statusCodes.CREATED).json(newExchange);
}

export default { getAllExchanges, createExchange };
