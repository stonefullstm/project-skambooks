import { Router } from "express";
import booksController from '../controllers/books.controller';
import validateToken from '../middleware/validateToken';

const routerBooks = Router();
routerBooks.delete('/books/:id', validateToken, booksController.deleteBook);
routerBooks.get('/books', booksController.getAllBooks);
routerBooks.post('/books', validateToken, booksController.createBook);

export default routerBooks;