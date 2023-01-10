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
const bcrypt = __importStar(require("bcrypt"));
const readers_model_1 = __importDefault(require("../database/models/readers.model"));
const getReaderById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const reader = yield readers_model_1.default.findByPk(id, {
        attributes: { exclude: ['password'] },
    });
    return reader;
});
const getAllReaders = () => __awaiter(void 0, void 0, void 0, function* () {
    const reader = yield readers_model_1.default.findAll({
        attributes: {
            exclude: ['address',
                'number',
                'complement',
                'district',
                'city',
                'zipCode',
                'state',
                'email',
                'phone',
                'password',
                'credits',
                'newReader']
        },
    });
    return reader;
});
const getReaderByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield readers_model_1.default.findOne({ where: { email } });
    return { id: user === null || user === void 0 ? void 0 : user.dataValues.id, email: user === null || user === void 0 ? void 0 : user.dataValues.email, password: user === null || user === void 0 ? void 0 : user.dataValues.password };
});
const createReader = (body) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, address, number, complement, zipCode, district, city, state, phone, email, password, credits } = body;
    const salt = bcrypt.genSaltSync();
    const hashPassword = bcrypt.hashSync(password, salt);
    const result = yield readers_model_1.default.create({
        name, address, number, complement,
        zipCode, district, city, state, phone, email,
        password: hashPassword, credits
    });
    return result;
});
const updateReader = (body, id) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, address, number, complement, zipCode, district, city, state, phone, email, credits } = body;
    const [updatedQty] = yield readers_model_1.default.update({ name, address, number, complement,
        zipCode, district, city, state, phone, email, credits }, {
        where: { id },
    });
    return updatedQty;
});
const deleteReader = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const deletedQty = yield readers_model_1.default.destroy({
        where: { id }
    });
    return deletedQty;
});
exports.default = { getReaderById,
    getAllReaders,
    createReader,
    getReaderByEmail,
    updateReader,
    deleteReader };
