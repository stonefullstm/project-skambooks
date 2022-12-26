import { Router } from "express";
import booksController from '../controllers/books.controller';

const routerBooks = Router();
routerBooks.delete('/books/:id', booksController.deleteBook);
routerBooks.get('/books', booksController.getAllBooks);
routerBooks.post('/books', booksController.createBook);

export default routerBooks;