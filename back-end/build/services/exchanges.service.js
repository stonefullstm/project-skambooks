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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const models_1 = __importDefault(require("../database/models"));
const books_model_1 = __importDefault(require("../database/models/books.model"));
const exchanges_model_1 = __importDefault(require("../database/models/exchanges.model"));
const readers_model_1 = __importDefault(require("../database/models/readers.model"));
const getAllExchangesByReader = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const exchanges = exchanges_model_1.default.findAll({
        where: {
            [sequelize_1.Op.or]: [
                { senderId: id },
                { receiverId: id }
            ]
        },
        include: [{ model: readers_model_1.default, as: 'sender', attributes: { exclude: ['password'] } },
            { model: readers_model_1.default, as: 'receiver', attributes: { exclude: ['password'] } },
            { model: books_model_1.default, as: 'bookExchanged' },],
        attributes: { exclude: ['senderId', 'receiverId', 'bookId'] },
        order: [['sendDate', 'DESC']]
    });
    return exchanges;
});
const getAllExchangesByBook = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const exchanges = yield exchanges_model_1.default.findAll({
        where: {
            bookId: id
        },
    });
    return exchanges;
});
const getExchangeById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const exchange = yield exchanges_model_1.default.findByPk(id, {
    // include: { model: authorsModel, as: 'authors', through: {attributes: []} }
    });
    return exchange;
});
const createExchange = (exchange) => __awaiter(void 0, void 0, void 0, function* () {
    const { senderId, receiverId, bookId } = exchange;
    const result = yield exchanges_model_1.default.create({
        senderId, receiverId, bookId
    });
    const _a = result.dataValues, { sendDate: _ } = _a, exchangeWithoutSendDate = __rest(_a, ["sendDate"]);
    const newExchange = Object.assign(Object.assign({}, exchangeWithoutSendDate), { sendDate: result.dataValues.sendDate });
    return newExchange;
});
const deleteExchange = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const deletedQty = yield exchanges_model_1.default.destroy({
        where: { id },
    });
    return deletedQty;
});
const confirmExchange = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return models_1.default.transaction((t) => __awaiter(void 0, void 0, void 0, function* () {
        const [updatedQty] = yield exchanges_model_1.default.update({ receiveDate: new Date() }, { where: { id } });
        const exchange = yield exchanges_model_1.default.findByPk(id);
        const updatedExchange = exchange;
        yield readers_model_1.default.update({ credits: models_1.default.literal('credits + 1') }, {
            where: { id: updatedExchange.senderId },
        });
        yield readers_model_1.default.update({ credits: models_1.default.literal('credits - 1') }, {
            where: { id: updatedExchange.receiverId },
        });
        yield books_model_1.default.update({ readerId: updatedExchange.receiverId }, {
            where: { id: updatedExchange.bookId },
        });
        return updatedQty;
    }));
});
exports.default = { getAllExchangesByReader,
    getAllExchangesByBook,
    createExchange,
    deleteExchange,
    getExchangeById,
    confirmExchange };
