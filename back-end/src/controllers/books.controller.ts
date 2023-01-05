import { Request, Response } from 'express';
import booksService from '../services/books.service';
import exchangesService from '../services/exchanges.service';
import statusCodes from '../statusCodes';

const getAllBooks = async (req: Request, res: Response) => {
  const books = await booksService.getAllBooks();
  res.status(statusCodes.OK).json(books);
};

const deleteBook = async ( req: Request, res: Response) => {
  const { id } = req.params;
  const result = await booksService.getBookById(Number(id));
  if (!result) {
    return res.status(statusCodes.NOT_FOUND).json({ message: 'Book not found'});
  }
  const exchanges = await exchangesService.getAllExchangesByBook(Number(id));
  if (exchanges && exchanges.length > 0) {
    return res.status(statusCodes.BAD_REQUEST).json({ message: 'Book has exchanges'});
  }
  const deletedQty = await booksService.deleteBook(Number(id));
  if (deletedQty) {
    return res.status(statusCodes.OK).json({ message: `Books deleted: ${deletedQty}`});
  };
  return res.status(statusCodes.ERROR).json({ message: 'Error'});
  
};

const createBook = async (req: Request, res: Response) => {
  const { isbn, title, year, pages, authors} = req.body;
  const { id: readerId } = req.body.user;
  const newBook = await booksService.createBook({isbn, title, year, pages, readerId, authors});
  return res.status(statusCodes.CREATED).json(newBook);
};
  
const updateBook = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { id: readerId } = req.body.user;
  const result = await booksService.getBookById(Number(id));
  if (!result) {
    return res.status(statusCodes.NOT_FOUND).json({ message: 'Book not found'});
  }
  if (result.readerId !== readerId) {
    return res.status(statusCodes.BAD_REQUEST).json({ message: 'Book is not owned by this reader'});
  }
  const updatedQty = await booksService.updateBook( req.body, Number(id));
  if (updatedQty) {
    return res.status(statusCodes.OK).json({ id, ...req.body });
  }
  return res.status(statusCodes.ERROR).json({ message: 'Error'});
}

export default {
  getAllBooks,
  deleteBook,
  createBook,
  updateBook,
};