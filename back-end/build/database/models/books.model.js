"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const _1 = __importDefault(require("."));
const authors_books_model_1 = __importDefault(require("./authors-books.model"));
const authors_model_1 = __importDefault(require("./authors.model"));
const readers_model_1 = __importDefault(require("./readers.model"));
class Book extends sequelize_1.Model {
}
Book.init({
    id: {
        type: sequelize_1.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    isbn: {
        type: (0, sequelize_1.STRING)(13),
        allowNull: false,
    },
    title: {
        type: (0, sequelize_1.STRING)(255),
        allowNull: false,
    },
    year: {
        allowNull: false,
        type: (0, sequelize_1.STRING)(4),
    },
    pages: {
        allowNull: false,
        type: sequelize_1.INTEGER,
    },
    readerId: {
        allowNull: false,
        type: sequelize_1.INTEGER,
        field: 'reader_id',
    },
    coverUrl: {
        allowNull: false,
        type: sequelize_1.STRING,
        field: 'cover_url',
        defaultValue: '../images/troca.png',
    }
}, {
    // ... Outras configs
    underscored: true,
    sequelize: _1.default,
    modelName: 'books',
    timestamps: false,
});
readers_model_1.default.hasMany(Book, { foreignKey: 'readerId', as: 'readers' });
Book.belongsTo(readers_model_1.default, { foreignKey: 'readerId', as: 'readers' });
authors_model_1.default.belongsToMany(Book, { foreignKey: 'authorId', as: 'books',
    through: authors_books_model_1.default, otherKey: 'bookIid' });
Book.belongsToMany(authors_model_1.default, { foreignKey: 'bookId', as: 'authors',
    through: authors_books_model_1.default, otherKey: 'authorId' });
exports.default = Book;
