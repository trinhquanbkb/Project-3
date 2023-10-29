"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.configs = void 0;
require('dotenv').config();
exports.configs = {
    mongoUrl: process.env.MONGO_DB,
    jwtSecret: process.env.JWT_SECRET,
    saltOrRound: 10,
    host: process.env.HOST
};
//# sourceMappingURL=configuration.js.map