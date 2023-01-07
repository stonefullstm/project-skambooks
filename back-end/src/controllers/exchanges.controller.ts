import { Request, Response } from 'express';
import booksService from '../services/books.service';
import exchangesService from '../services/exchanges.service';
import readersService from '../services/readers.service';
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
  const book = await booksService.getBookById(bookId);
  if (!book || book.readerId !== senderId) {
    return res.status(statusCodes.BAD_REQUEST).json({ message: 'Book is not owned by this reader' });
  }
  const reader = await readersService.getReaderById(receiverId);
  if (!reader || reader.credits === 0) {
    return res.status(statusCodes.BAD_REQUEST).json({ message: 'Reader has no credits' });
  }
  const newExchange = await exchangesService.createExchange({ senderId, receiverId, bookId, sendDate: '', receiveDate: '' });
  if (newExchange) {
    return res.status(statusCodes.CREATED).json({ message: 'Create sucess! '});
  }
}

const confirmExchange = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { id: readerId } = req.body.user;
  const result = await exchangesService.getExchangeById(Number(id));
  if (!result) {
    return res.status(statusCodes.NOT_FOUND).json({ message: 'Exchange not found'});
  }
  if (result.receiverId != readerId) {
    return res.status(statusCodes.BAD_REQUEST).json({ message: 'Reader cannot confirm exchange' });
  }
  const reader = await readersService.getReaderById(readerId);
  if (!reader || reader.credits === 0) {
    return res.status(statusCodes.BAD_REQUEST).json({ message: 'Reader has no credits' });
  }
  const updatedQty = await exchangesService.confirmExchange(Number(id));
  if (updatedQty) {
    const result = await exchangesService.getExchangeById(Number(id));
    return res.status(statusCodes.OK).json({ message: `${result.id}` });
  }
  return res.status(statusCodes.ERROR).json({ message: 'Error'});
}

const deleteExchange = async ( req: Request, res: Response) => {
  const { id } = req.params;
  const { id: readerId } = req.body.user;
  const result = await exchangesService.getExchangeById(Number(id));
  if (!result) {
    return res.status(statusCodes.NOT_FOUND).json({ message: 'Exchange not found'});
  }
  if (result.receiveDate) {
    return res.status(statusCodes.BAD_REQUEST).json({ message: 'Confirmed exchange cannot be deleted'});
  }
  if (result.senderId !== readerId) {
    return res.status(statusCodes.UNAUTHORIZED).json({ message: 'Reader cannot delete exchange' });
  }
  const exchange = await exchangesService.deleteExchange(Number(id));
  if (exchange) {
    return res.status(statusCodes.OK).json({ message: `Exchange deleted: ${id}`});
  };
  return res.status(statusCodes.ERROR).json({ message: 'Error'});
  
};

export default { getAllExchangesByReader, 
  createExchange, 
  deleteExchange, 
  getExchangeById,
  confirmExchange };
