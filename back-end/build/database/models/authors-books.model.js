"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const _1 = __importDefault(require("."));
class AuthorsBooks extends sequelize_1.Model {
}
AuthorsBooks.init({
    bookId: {
        type: sequelize_1.INTEGER,
        allowNull: false,
        // primaryKey: true,
    },
    authorId: {
        type: sequelize_1.INTEGER,
        allowNull: false,
        // primaryKey: true,
    },
}, {
    // ... Outras configs
    underscored: true,
    sequelize: _1.default,
    modelName: 'authors_books',
    timestamps: false,
});
exports.default = AuthorsBooks;
