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
exports.CreateFinancialTransactionDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
class CreateFinancialTransactionDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ example: "656ea7bf54a30218aea8cb80" }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateFinancialTransactionDto.prototype, "supplierId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "jsfh" }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateFinancialTransactionDto.prototype, "note", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "65661aae5d6716968c2b811a" }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateFinancialTransactionDto.prototype, "warehouseId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: [{
                expriry_data: "20/11/2022",
                quantity: 21,
                price: 21000,
                product_id: '656fce775c72bc1cef5b4d5a',
                weight: 30
            }]
    }),
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], CreateFinancialTransactionDto.prototype, "products", void 0);
exports.CreateFinancialTransactionDto = CreateFinancialTransactionDto;
//# sourceMappingURL=create-financial-transaction.dto.js.map