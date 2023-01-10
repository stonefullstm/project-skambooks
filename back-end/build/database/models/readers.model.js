"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const _1 = __importDefault(require("."));
class Reader extends sequelize_1.Model {
}
Reader.init({
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: sequelize_1.INTEGER,
    },
    name: {
        allowNull: false,
        type: (0, sequelize_1.STRING)(255),
    },
    address: {
        allowNull: false,
        type: (0, sequelize_1.STRING)(255),
    },
    number: {
        allowNull: true,
        type: sequelize_1.INTEGER,
    },
    complement: {
        allowNull: true,
        type: (0, sequelize_1.STRING)(255),
    },
    zipCode: {
        allowNull: false,
        type: (0, sequelize_1.STRING)(8),
        field: 'zip_code',
    },
    district: {
        allowNull: false,
        type: (0, sequelize_1.STRING)(255),
    },
    city: {
        allowNull: false,
        type: (0, sequelize_1.STRING)(255),
    },
    state: {
        allowNull: false,
        type: (0, sequelize_1.STRING)(255),
    },
    phone: {
        allowNull: false,
        type: (0, sequelize_1.STRING)(11),
    },
    email: {
        allowNull: false,
        type: (0, sequelize_1.STRING)(255),
    },
    password: {
        allowNull: false,
        type: (0, sequelize_1.STRING)(255),
    },
    credits: {
        allowNull: true,
        type: sequelize_1.INTEGER,
        defaultValue: 0,
    },
    newReader: {
        allowNull: true,
        type: sequelize_1.BOOLEAN,
        defaultValue: 1,
    }
}, {
    // ... Outras configs
    underscored: true,
    sequelize: _1.default,
    modelName: 'readers',
    timestamps: false,
});
exports.default = Reader;
