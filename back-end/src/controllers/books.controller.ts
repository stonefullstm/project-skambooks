import { Request, Response } from 'express';
import booksService from '../services/books.service';
import exchangesService from '../services/exchanges.service';
import statusCodes from '../statusCodes';
import { internalError } from '../utils';

const BOOK_NOT_FOUND = 'Book not found';
const OK = 'OK';

const getAllBooks = async (req: Request, res: Response) => {
  const books = await booksService.getAllBooks();
  // const books = { resposta: 'OK' };
  res.status(statusCodes.OK).json({ 
    status: statusCodes.OK,
    message: OK,
    data: books});
};

const getBookById = async ( req: Request, res: Response) => {
  const { id } = req.params;
  const result = await booksService.getBookById(Number(id));
  if (result) {
    return res.status(statusCodes.OK).json({
      status: statusCodes.OK,
      message: OK,
      data: result});
  }
  return res.status(statusCodes.NOT_FOUND).json({
    status: statusCodes.NOT_FOUND, 
    message: BOOK_NOT_FOUND,
    data: {}
  });
};

const deleteBook = async ( req: Request, res: Response) => {
  const { id } = req.params;
  const result = await booksService.getBookById(Number(id));
  if (!result) {
    return res.status(statusCodes.NOT_FOUND).json({ 
      status: statusCodes.NOT_FOUND, 
      message: BOOK_NOT_FOUND,
      data: {}});
  }
  const exchanges = await exchangesService.getAllExchangesByBook(Number(id));
  if (exchanges && exchanges.length > 0) {
    return res.status(statusCodes.BAD_REQUEST).json({ 
      status: statusCodes.BAD_REQUEST, 
      message: 'Book has exchanges',
      data: {}});
  }
  const deletedQty = await booksService.deleteBook(Number(id));
  if (deletedQty) {
    return res.status(statusCodes.OK).json({
      status: statusCodes.OK, 
      message: `Book deleted: ${id}`,
      data: {}
    });
  };
  return res.status(statusCodes.ERROR).json(internalError);
  
};

const createBook = async (req: Request, res: Response) => {
  const { isbn, title, year, pages, coverUrl, authors} = req.body;
  const { id: readerId } = req.body.user;
  const newBook = await booksService.createBook({isbn, title, year, pages, readerId, coverUrl, authors});
  return res.status(statusCodes.CREATED).json({
    status: statusCodes.CREATED,
    message: 'Created book',
    data: newBook
  });
};
  
const updateBook = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { id: readerId } = req.body.user;
  const result = await booksService.getBookById(Number(id));
  if (!result) {
    return res.status(statusCodes.NOT_FOUND).json({ 
      status: statusCodes.NOT_FOUND, 
      message: BOOK_NOT_FOUND,
      data: {}});
  }
  if (result.readerId !== readerId) {
    return res.status(statusCodes.BAD_REQUEST).json({
      status: statusCodes.BAD_REQUEST,
      message: 'Book is not owned by this reader',
      data: {}
    });
  }
  const updatedQty = await booksService.updateBook( req.body, Number(id));
  if (updatedQty) {
    return res.status(statusCodes.OK).json({ 
      status: statusCodes.OK,
      message: `Updated book ${id}`,
      data: {}
    });
  }
  return res.status(statusCodes.ERROR).json(internalError);
}

export default {
  getAllBooks,
  getBookById,
  deleteBook,
  createBook,
  updateBook,
};