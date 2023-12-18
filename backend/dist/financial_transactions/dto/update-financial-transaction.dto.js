"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateFinancialTransactionDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_financial_transaction_dto_1 = require("./create-financial-transaction.dto");
class UpdateFinancialTransactionDto extends (0, mapped_types_1.PartialType)(create_financial_transaction_dto_1.CreateFinancialTransactionDto) {
}
exports.UpdateFinancialTransactionDto = UpdateFinancialTransactionDto;
//# sourceMappingURL=update-financial-transaction.dto.js.map