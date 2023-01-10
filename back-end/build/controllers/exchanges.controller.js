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
const readers_service_1 = __importDefault(require("../services/readers.service"));
const statusCodes_1 = __importDefault(require("../statusCodes"));
const getAllExchangesByReader = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.body.user;
    const exchanges = yield exchanges_service_1.default.getAllExchangesByReader(id);
    res.status(statusCodes_1.default.OK).json(exchanges);
});
const getExchangeById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield exchanges_service_1.default.getExchangeById(Number(id));
    if (result) {
        return res.status(statusCodes_1.default.OK).json(result);
    }
    return res.status(statusCodes_1.default.NOT_FOUND).json({ message: 'Exchange not found' });
});
const createExchange = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { receiverId, bookId } = req.body;
    const { id: senderId } = req.body.user;
    const book = yield books_service_1.default.getBookById(bookId);
    if (!book || book.readerId !== senderId) {
        return res.status(statusCodes_1.default.BAD_REQUEST).json({ message: 'Book is not owned by this reader' });
    }
    const reader = yield readers_service_1.default.getReaderById(receiverId);
    if (!reader || reader.credits === 0) {
        return res.status(statusCodes_1.default.BAD_REQUEST).json({ message: 'Reader has no credits' });
    }
    const newExchange = yield exchanges_service_1.default.createExchange({ senderId, receiverId, bookId, sendDate: '', receiveDate: '' });
    if (newExchange) {
        return res.status(statusCodes_1.default.CREATED).json({ message: 'Create sucess! ' });
    }
});
const confirmExchange = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { id: readerId } = req.body.user;
    const result = yield exchanges_service_1.default.getExchangeById(Number(id));
    if (!result) {
        return res.status(statusCodes_1.default.NOT_FOUND).json({ message: 'Exchange not found' });
    }
    if (result.receiverId != readerId) {
        return res.status(statusCodes_1.default.BAD_REQUEST).json({ message: 'Reader cannot confirm exchange' });
    }
    const reader = yield readers_service_1.default.getReaderById(readerId);
    if (!reader || reader.credits === 0) {
        return res.status(statusCodes_1.default.BAD_REQUEST).json({ message: 'Reader has no credits' });
    }
    const updatedQty = yield exchanges_service_1.default.confirmExchange(Number(id));
    if (updatedQty) {
        const result = yield exchanges_service_1.default.getExchangeById(Number(id));
        return res.status(statusCodes_1.default.OK).json({ message: `${result.id}` });
    }
    return res.status(statusCodes_1.default.ERROR).json({ message: 'Error' });
});
const deleteExchange = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { id: readerId } = req.body.user;
    const result = yield exchanges_service_1.default.getExchangeById(Number(id));
    if (!result) {
        return res.status(statusCodes_1.default.NOT_FOUND).json({ message: 'Exchange not found' });
    }
    if (result.receiveDate) {
        return res.status(statusCodes_1.default.BAD_REQUEST).json({ message: 'Confirmed exchange cannot be deleted' });
    }
    if (result.senderId !== readerId) {
        return res.status(statusCodes_1.default.UNAUTHORIZED).json({ message: 'Reader cannot delete exchange' });
    }
    const exchange = yield exchanges_service_1.default.deleteExchange(Number(id));
    if (exchange) {
        return res.status(statusCodes_1.default.OK).json({ message: `Exchange deleted: ${id}` });
    }
    ;
    return res.status(statusCodes_1.default.ERROR).json({ message: 'Error' });
});
exports.default = { getAllExchangesByReader,
    createExchange,
    deleteExchange,
    getExchangeById,
    confirmExchange };
