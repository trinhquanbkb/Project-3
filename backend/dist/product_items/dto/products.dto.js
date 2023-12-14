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
exports.ProductItemDTO = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
class ProductItemDTO {
}
__decorate([
    (0, swagger_1.ApiProperty)({ example: '20/11/2023', description: 'Ngày hết hạn' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ProductItemDTO.prototype, "expriry_data", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1, description: 'Số lượng' }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], ProductItemDTO.prototype, "quantity", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 23000, description: 'Giá tiền' }),
    __metadata("design:type", Number)
], ProductItemDTO.prototype, "price", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '', description: 'id của kho' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ProductItemDTO.prototype, "warehouse_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '', description: 'id đối tác' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ProductItemDTO.prototype, "supplier_id", void 0);
exports.ProductItemDTO = ProductItemDTO;
//# sourceMappingURL=products.dto.js.map