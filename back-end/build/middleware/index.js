"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUpdateBook = exports.validateBook = exports.validateReader = exports.validateLogin = void 0;
const joi_1 = __importDefault(require("joi"));
const loginSchema = joi_1.default.object({
    email: joi_1.default.string().email().required(),
    password: joi_1.default.string().min(8).required(),
});
const readerSchema = joi_1.default.object({
    name: joi_1.default.string().required(),
    address: joi_1.default.string().required(),
    number: joi_1.default.number(),
    zipCode: joi_1.default.string().length(8),
    district: joi_1.default.string().required(),
    city: joi_1.default.string().required(),
    state: joi_1.default.string().length(2),
    phone: joi_1.default.string().required(),
    email: joi_1.default.string().email().required(),
    password: joi_1.default.string().min(8).required(),
});
const bookSchema = joi_1.default.object({
    isbn: joi_1.default.string().required(),
    title: joi_1.default.string().required(),
    year: joi_1.default.string().length(4).required(),
    pages: joi_1.default.number().required(),
    // readerId: Joi.number().required(),
    coverUrl: joi_1.default.string(),
    authors: joi_1.default.array().required(),
});
const updateBookSchema = joi_1.default.object({
    isbn: joi_1.default.string().required(),
    title: joi_1.default.string().required(),
    year: joi_1.default.string().length(4).required(),
    pages: joi_1.default.number().required(),
    coverUrl: joi_1.default.string(),
});
const validateLogin = (req, res, next) => {
    const { error } = loginSchema.validate(req.body);
    if (error)
        return res.status(400).json({ message: error.message });
    next();
};
exports.validateLogin = validateLogin;
const validateReader = (req, res, next) => {
    const { error } = readerSchema.validate(req.body);
    if (error)
        return res.status(400).json({ message: error.message });
    next();
};
exports.validateReader = validateReader;
const validateBook = (req, res, next) => {
    const { isbn, title, year, pages, coverUrl, authors } = req.body;
    const { error } = bookSchema.validate({ isbn, title, year, pages, coverUrl, authors });
    if (error)
        return res.status(400).json({ message: error.message });
    next();
};
exports.validateBook = validateBook;
const validateUpdateBook = (req, res, next) => {
    const { isbn, title, year, pages, coverUrl } = req.body;
    const { error } = updateBookSchema.validate({ isbn, title, year, pages, coverUrl });
    if (error)
        return res.status(400).json({ message: error.message });
    next();
};
exports.validateUpdateBook = validateUpdateBook;
