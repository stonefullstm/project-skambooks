"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const books_service_1 = __importDefault(require("../services/books.service"));
const exchanges_service_1 = __importDefault(require("../services/exchanges.service"));
const statusCodes_1 = __importDefault(require("../statusCodes"));
const getAllBooks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // const books = await booksService.getAllBooks();
    const books = { resposta: 'OK' };
    res.status(statusCodes_1.default.OK).json(books);
});
const getBookById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield books_service_1.default.getBookById(Number(id));
    if (result) {
        return res.status(statusCodes_1.default.OK).json(result);
    }
    return res.status(statusCodes_1.default.NOT_FOUND).json({ message: 'Book not found' });
});
const deleteBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield books_service_1.default.getBookById(Number(id));
    if (!result) {
        return res.status(statusCodes_1.default.NOT_FOUND).json({ message: 'Book not found' });
    }
    const exchanges = yield exchanges_service_1.default.getAllExchangesByBook(Number(id));
    if (exchanges && exchanges.length > 0) {
        return res.status(statusCodes_1.default.BAD_REQUEST).json({ message: 'Book has exchanges' });
    }
    const deletedQty = yield books_service_1.default.deleteBook(Number(id));
    if (deletedQty) {
        return res.status(statusCodes_1.default.OK).json({ message: `Books deleted: ${id}` });
    }
    ;
    return res.status(statusCodes_1.default.ERROR).json({ message: 'Error' });
});
const createBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { isbn, title, year, pages, coverUrl, authors } = req.body;
    const { id: readerId } = req.body.user;
    const newBook = yield books_service_1.default.createBook({ isbn, title, year, pages, readerId, coverUrl, authors });
    return res.status(statusCodes_1.default.CREATED).json({ message: `Create book: ${newBook}` });
});
const updateBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { id: readerId } = req.body.user;
    const result = yield books_service_1.default.getBookById(Number(id));
    if (!result) {
        return res.status(statusCodes_1.default.NOT_FOUND).json({ message: 'Book not found' });
    }
    if (result.readerId !== readerId) {
        return res.status(statusCodes_1.default.BAD_REQUEST).json({ message: 'Book is not owned by this reader' });
    }
    const updatedQty = yield books_service_1.default.updateBook(req.body, Number(id));
    if (updatedQty) {
        return res.status(statusCodes_1.default.OK).json({ message: `Update book ${id}` });
    }
    return res.status(statusCodes_1.default.ERROR).json({ message: 'Error' });
});
exports.default = {
    getAllBooks,
    getBookById,
    deleteBook,
    createBook,
    updateBook,
};
