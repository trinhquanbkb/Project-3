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
exports.ProductsDTO = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
class ProductsDTO {
}
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Áo phông', description: 'Tên địa chỉ' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ProductsDTO.prototype, "product_name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: ["Áo"], description: 'Mảng phân loại sản phẩm' }),
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], ProductsDTO.prototype, "category", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'https://scontent.fhan14-3.fna.fbcdn.net/v/t1.15752-9/398237708_218062464638041_381703009752984850_n.png?_nc_cat=103&ccb=1-7&_nc_sid=8cd0a2&_nc_ohc=dLbVrAE1GtQAX8bfZHz&_nc_ht=scontent.fhan14-3.fna&oh=03_AdRDhmengk_Kh0YTXeHpuqNeoCBgI_o0pDQK4BY4xnhjLQ&oe=658A886E', description: 'Địa chỉ hình ảnh' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ProductsDTO.prototype, "url", void 0);
exports.ProductsDTO = ProductsDTO;
//# sourceMappingURL=products.dto.js.map