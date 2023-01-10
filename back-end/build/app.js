"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const books_routes_1 = __importDefault(require("./routes/books.routes"));
const exchanges_routes_1 = __importDefault(require("./routes/exchanges.routes"));
const readers_routes_1 = __importDefault(require("./routes/readers.routes"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: '*'
}));
app.use(express_1.default.json());
app.use(books_routes_1.default);
app.use(readers_routes_1.default);
app.use(exchanges_routes_1.default);
exports.default = app;
