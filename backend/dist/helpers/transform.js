"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transformError = void 0;
const common_1 = require("@nestjs/common");
const transformError = (error) => {
    throw new common_1.HttpException({ statusCode: common_1.HttpStatus.BAD_REQUEST, message: error }, common_1.HttpStatus.BAD_REQUEST);
};
exports.transformError = transformError;
//# sourceMappingURL=transform.js.map