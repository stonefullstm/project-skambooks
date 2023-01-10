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
const models_1 = __importDefault(require("../database/models"));
const authors_model_1 = __importDefault(require("../database/models/authors.model"));
const books_model_1 = __importDefault(require("../database/models/books.model"));
const readers_model_1 = __importDefault(require("../database/models/readers.model"));
const getAllBooks = () => __awaiter(void 0, void 0, void 0, function* () {
    const books = yield books_model_1.default.findAll({
        include: [{ model: readers_model_1.default, as: 'readers', attributes: { exclude: ['password'] } },
            { model: authors_model_1.default, as: 'authors', through: { attributes: [] } },],
        attributes: { exclude: ['readerId', 'reader_id'] }
    });
    return books;
});
const getBookById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const book = yield books_model_1.default.findByPk(id, {
        include: { model: authors_model_1.default, as: 'authors', through: { attributes: [] } }
    });
    return book;
});
const deleteBook = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const deletedQty = yield books_model_1.default.destroy({
        where: { id },
    });
    return deletedQty;
});
const createBook = (book) => __awaiter(void 0, void 0, void 0, function* () {
    const { isbn, title, year, pages, readerId, coverUrl, authors } = book;
    return models_1.default.transaction((t) => __awaiter(void 0, void 0, void 0, function* () {
        const newBook = yield books_model_1.default.create({
            isbn, title, year, pages, readerId, coverUrl, authors,
        }, { include: [{ model: authors_model_1.default, as: 'authors' }] });
        const reader = yield readers_model_1.default.findByPk(readerId, {
            attributes: { exclude: ['password'] },
        });
        const newReader = reader;
        if (newReader && newReader.newReader) {
            yield readers_model_1.default.update({ credits: 1, newReader: 0 }, {
                where: { id: readerId },
            });
        }
        return newBook;
    }));
});
const updateBook = (book, id) => __awaiter(void 0, void 0, void 0, function* () {
    const { isbn, title, year, pages, coverUrl } = book;
    const [updatedQty] = yield books_model_1.default.update({
        isbn, title, year, pages, coverUrl
    }, { where: { id } });
    return updatedQty;
});
exports.default = { getAllBooks, deleteBook, getBookById, createBook, updateBook };
