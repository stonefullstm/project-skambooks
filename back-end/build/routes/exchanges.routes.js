"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const exchanges_controller_1 = __importDefault(require("../controllers/exchanges.controller"));
const validateToken_1 = __importDefault(require("../middleware/validateToken"));
const routerExchanges = (0, express_1.Router)();
routerExchanges.get('/exchanges', validateToken_1.default, exchanges_controller_1.default.getAllExchangesByReader);
routerExchanges.get('/exchanges/:id', validateToken_1.default, exchanges_controller_1.default.getExchangeById);
routerExchanges.post('/exchanges', validateToken_1.default, exchanges_controller_1.default.createExchange);
routerExchanges.put('/exchanges/:id', validateToken_1.default, exchanges_controller_1.default.confirmExchange);
routerExchanges.delete('/exchanges/:id', validateToken_1.default, exchanges_controller_1.default.deleteExchange);
exports.default = routerExchanges;
