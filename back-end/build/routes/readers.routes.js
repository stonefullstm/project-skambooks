"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const readers_controller_1 = __importDefault(require("../controllers/readers.controller"));
const middleware_1 = require("../middleware");
const validateToken_1 = __importDefault(require("../middleware/validateToken"));
const routerReader = (0, express_1.Router)();
routerReader.delete('/readers', validateToken_1.default, readers_controller_1.default.deleteReader);
routerReader.put('/readers', validateToken_1.default, middleware_1.validateReader, readers_controller_1.default.updateReader);
routerReader.post('/readers', middleware_1.validateReader, readers_controller_1.default.createReader);
routerReader.get('/readers', validateToken_1.default, readers_controller_1.default.getReaderById);
routerReader.get('/readers/names', validateToken_1.default, readers_controller_1.default.getAllReaders);
routerReader.post('/login', middleware_1.validateLogin, readers_controller_1.default.getReaderByEmail);
exports.default = routerReader;
