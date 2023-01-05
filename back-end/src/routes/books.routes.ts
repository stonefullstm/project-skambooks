import { Router } from "express";
import booksController from '../controllers/books.controller';
import { validateBook } from '../middleware';
import validateToken from '../middleware/validateToken';

const routerBooks = Router();
routerBooks.delete('/books/:id', validateToken, booksController.deleteBook);
routerBooks.get('/books', validateToken, booksController.getAllBooks);
routerBooks.post('/books', validateToken, validateBook, booksController.createBook);

export default routerBooks;