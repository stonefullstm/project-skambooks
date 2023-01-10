"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const _1 = __importDefault(require("."));
const books_model_1 = __importDefault(require("./books.model"));
const readers_model_1 = __importDefault(require("./readers.model"));
class Exchange extends sequelize_1.Model {
}
Exchange.init({
    id: {
        type: sequelize_1.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
    },
    senderId: {
        type: sequelize_1.INTEGER,
        allowNull: false,
    },
    receiverId: {
        type: sequelize_1.INTEGER,
        allowNull: false,
    },
    bookId: {
        type: sequelize_1.INTEGER,
        allowNull: false,
    },
    sendDate: {
        type: sequelize_1.DATE,
        allowNull: true,
        defaultValue: new Date(),
    },
    receiveDate: {
        type: sequelize_1.DATE,
        allowNull: true,
    },
}, {
    // ... Outras configs
    underscored: true,
    sequelize: _1.default,
    modelName: 'exchanges',
    timestamps: false,
});
readers_model_1.default.hasMany(Exchange, { foreignKey: 'senderId', as: 'sender' });
Exchange.belongsTo(readers_model_1.default, { foreignKey: 'senderId', as: 'sender' });
readers_model_1.default.hasMany(Exchange, { foreignKey: 'receiverId', as: 'receiver' });
Exchange.belongsTo(readers_model_1.default, { foreignKey: 'receiverId', as: 'receiver' });
books_model_1.default.hasMany(Exchange, { foreignKey: 'bookId', as: 'bookExchanged' });
Exchange.belongsTo(books_model_1.default, { foreignKey: 'bookId', as: 'bookExchanged' });
exports.default = Exchange;
