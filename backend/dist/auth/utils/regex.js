"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.regPhone = exports.regEmail = exports.regPassword = exports.regUsername = void 0;
exports.regUsername = /^[A-Za-z0-9_-]{3,16}$/;
exports.regPassword = /(?=(.*[0-9]))((?=.*[A-Za-z0-9])(?=.*[A-Z])(?=.*[a-z]))^.{8,}$/;
exports.regEmail = /^[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+$/;
exports.regPhone = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
//# sourceMappingURL=regex.js.map