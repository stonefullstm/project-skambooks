"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const jwt = require('jsonwebtoken');
const bcrypt = __importStar(require("bcrypt"));
const readers_service_1 = __importDefault(require("../services/readers.service"));
const statusCodes_1 = __importDefault(require("../statusCodes"));
require('dotenv/config');
const secret = process.env.JWTSECRET || 'seusecretdetoken';
const getReaderById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.body.user;
    const result = yield readers_service_1.default.getReaderById(Number(id));
    if (result) {
        return res.status(statusCodes_1.default.OK).json(result);
    }
    return res.status(statusCodes_1.default.NOT_FOUND).json({ message: 'Reader not found' });
});
const getAllReaders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield readers_service_1.default.getAllReaders();
    if (!result) {
        return res.status(statusCodes_1.default.NOT_FOUND).json({ message: 'Readers not found' });
    }
    return res.status(statusCodes_1.default.OK).json(result);
});
const getReaderByEmail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const user = yield readers_service_1.default.getReaderByEmail(email);
    if (!user || !user.id) {
        return res.status(statusCodes_1.default.NOT_FOUND).json({ message: 'User not found' });
    }
    ;
    if (!bcrypt.compareSync(password, user.password)) {
        return res.status(statusCodes_1.default.NOT_FOUND).json({ message: 'Invalid password' });
    }
    const userData = {
        id: user.id,
        email,
    };
    const jwtConfig = {
        expiresIn: '1d',
        algorithm: 'HS256',
    };
    const token = jwt.sign(userData, secret, jwtConfig);
    res.status(statusCodes_1.default.OK).json({ token });
});
const createReader = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body;
    const user = yield readers_service_1.default.getReaderByEmail(email);
    if (user && user.email) {
        return res.status(statusCodes_1.default.BAD_REQUEST).json({ message: 'E-mail already exists' });
    }
    const result = yield readers_service_1.default.createReader(req.body);
    if (result) {
        return res.status(statusCodes_1.default.CREATED).json(req.body);
    }
    return res.status(statusCodes_1.default.ERROR).json({ message: 'Error' });
});
const updateReader = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.body.user;
    const reader = yield readers_service_1.default.getReaderById(Number(id));
    if (!reader) {
        return res.status(statusCodes_1.default.NOT_FOUND).json({ message: 'Reader not found' });
    }
    const updatedQty = yield readers_service_1.default.updateReader(req.body, Number(id));
    if (updatedQty) {
        return res.status(statusCodes_1.default.OK).json(Object.assign({ id }, req.body));
    }
    return res.status(statusCodes_1.default.ERROR).json({ message: 'Error' });
});
const deleteReader = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.body.user;
    const result = yield readers_service_1.default.getReaderById(Number(id));
    if (!result) {
        return res.status(statusCodes_1.default.NOT_FOUND).json({ message: 'Reader not found' });
    }
    const reader = yield readers_service_1.default.deleteReader(Number(id));
    if (reader) {
        return res.status(statusCodes_1.default.OK).json({ message: `Reader deleted: ${id}` });
    }
    ;
    return res.status(statusCodes_1.default.ERROR).json({ message: 'Error' });
});
exports.default = { getReaderById,
    getAllReaders,
    createReader,
    getReaderByEmail,
    updateReader,
    deleteReader };
