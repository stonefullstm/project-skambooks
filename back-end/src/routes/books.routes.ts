import { Router } from "express";
import booksController from '../controllers/books.controller';
import { validateBook, validateUpdateBook } from '../middleware';
import validateToken from '../middleware/validateToken';

const routerBooks = Router();
routerBooks.delete('/books/:id', validateToken, booksController.deleteBook);
routerBooks.get('/books', booksController.getAllBooks);
routerBooks.get('/books/:id', validateToken, booksController.getBookById);
routerBooks.post('/books', validateToken, validateBook, booksController.createBook);
routerBooks.put('/books/:id', validateToken, validateUpdateBook, booksController.updateBook);

export default routerBooks;