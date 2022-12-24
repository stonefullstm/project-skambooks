import { Router } from "express";
import booksController from '../controllers/books.controller';

const routerBooks = Router();
routerBooks.delete('/livros/:id', booksController.deleteBook);
routerBooks.get('/livros', booksController.getAllBooks);
routerBooks.post('/livros', booksController.createBook);

export default routerBooks;