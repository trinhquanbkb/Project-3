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
exports.OrdersDTO = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
class OrdersDTO {
}
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Hà đông', description: 'Địa chỉ gửi' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], OrdersDTO.prototype, "sender", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Cầu giấy', description: 'Địa chỉ nhận' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], OrdersDTO.prototype, "receiver", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: [
            {
                product_id: 'id san pham',
                product_item: [{ product_item_id: 'id item', quantity: 1 }],
                price: 10000,
            },
        ],
        description: 'Mảng sản phẩm',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", Array)
], OrdersDTO.prototype, "products", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Được kiểm tra', description: 'Ghi chú' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], OrdersDTO.prototype, "note", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'id', description: 'id shipping' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], OrdersDTO.prototype, "shipping_id", void 0);
exports.OrdersDTO = OrdersDTO;
//# sourceMappingURL=orders.dto.js.map