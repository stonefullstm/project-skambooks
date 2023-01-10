"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const books_controller_1 = __importDefault(require("../controllers/books.controller"));
const middleware_1 = require("../middleware");
const validateToken_1 = __importDefault(require("../middleware/validateToken"));
const routerBooks = (0, express_1.Router)();
routerBooks.delete('/books/:id', validateToken_1.default, books_controller_1.default.deleteBook);
routerBooks.get('/books', validateToken_1.default, books_controller_1.default.getAllBooks);
routerBooks.get('/books/:id', validateToken_1.default, books_controller_1.default.getBookById);
routerBooks.post('/books', validateToken_1.default, middleware_1.validateBook, books_controller_1.default.createBook);
routerBooks.put('/books/:id', validateToken_1.default, middleware_1.validateUpdateBook, books_controller_1.default.updateBook);
exports.default = routerBooks;
