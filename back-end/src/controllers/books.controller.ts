import { Request, Response } from 'express';
import booksService from '../services/books.service';
import statusCodes from '../statusCodes';
import { TAuthor } from '../types';

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
  const book = await booksService.deleteBook(Number(id));
  if (book) {
    return res.status(statusCodes.OK).json({ message: `Book deleted: ${id}`});
  };
  return res.status(statusCodes.ERROR).json({ message: 'Error'});
  
};

const createBook = async (req: Request, res: Response) => {
  const { isbn, title, year, pages, readerId, authors} = req.body;
  await booksService.createBook({isbn, title, year, pages, readerId, authors});
  const idBook = (await booksService.getAllBooks()).length;
  const promise = await authors.map((i: TAuthor) => booksService.createAuthor(i));
  const b = await Promise.all(promise);
  
  const a = b.map((item: {
    dataValues: any;
    autores: any; id: number; 
}) => booksService.createAuthorBook( idBook, item.dataValues.id));
  await Promise.all(a);
  return res.status(statusCodes.CREATED).json(req.body);
};
  
export default {
  getAllBooks,
  deleteBook,
  createBook,
};