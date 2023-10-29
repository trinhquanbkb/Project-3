"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BadRequestExceptionFilter = void 0;
const lodash_1 = require("lodash");
const common_1 = require("@nestjs/common");
let BadRequestExceptionFilter = class BadRequestExceptionFilter {
    catch(exception, host) {
        const errorResponse = exception === null || exception === void 0 ? void 0 : exception.getResponse();
        const error = (Array.isArray((0, lodash_1.get)(errorResponse, 'message'))
            ? (0, lodash_1.first)((0, lodash_1.get)(errorResponse, 'message'))
            : (0, lodash_1.get)(errorResponse, 'message')) || exception.message;
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const status = exception.getStatus();
        response.status(status).json({
            statusCode: status,
            message: error,
        });
    }
};
BadRequestExceptionFilter = __decorate([
    (0, common_1.Catch)(common_1.BadRequestException)
], BadRequestExceptionFilter);
exports.BadRequestExceptionFilter = BadRequestExceptionFilter;
//# sourceMappingURL=error.js.map