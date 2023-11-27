"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateFinancialTransactionDto = void 0;
const class_validator_1 = require("class-validator");
class UpdateFinancialTransactionDto {
}
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateFinancialTransactionDto.prototype, "transaction_name", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateFinancialTransactionDto.prototype, "product_id", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateFinancialTransactionDto.prototype, "phone", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateFinancialTransactionDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], UpdateFinancialTransactionDto.prototype, "quantity", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], UpdateFinancialTransactionDto.prototype, "unit_price", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], UpdateFinancialTransactionDto.prototype, "total_amount", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateFinancialTransactionDto.prototype, "type", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateFinancialTransactionDto.prototype, "status", void 0);
exports.UpdateFinancialTransactionDto = UpdateFinancialTransactionDto;
//# sourceMappingURL=update-financial-transaction.dto.js.map