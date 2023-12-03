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
exports.FinancialTransactionSchema = exports.FinancialTransaction = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const configuration_1 = require("../../config/configuration");
let FinancialTransaction = class FinancialTransaction {
};
__decorate([
    (0, mongoose_1.Prop)({
        required: true,
        type: String,
    }),
    __metadata("design:type", String)
], FinancialTransaction.prototype, "transaction_name", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        required: true,
        type: String,
    }),
    __metadata("design:type", String)
], FinancialTransaction.prototype, "product_id", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        required: true,
        type: Number,
    }),
    __metadata("design:type", Number)
], FinancialTransaction.prototype, "quantity", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        required: true,
        type: Number,
    }),
    __metadata("design:type", Number)
], FinancialTransaction.prototype, "unit_price", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        required: true,
        type: Number,
    }),
    __metadata("design:type", Number)
], FinancialTransaction.prototype, "total_amount", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        required: true,
        type: String,
    }),
    __metadata("design:type", String)
], FinancialTransaction.prototype, "type", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        required: true,
        type: String,
    }),
    __metadata("design:type", String)
], FinancialTransaction.prototype, "status", void 0);
FinancialTransaction = __decorate([
    (0, mongoose_1.Schema)({
        timestamps: true
    })
], FinancialTransaction);
exports.FinancialTransaction = FinancialTransaction;
exports.FinancialTransactionSchema = mongoose_1.SchemaFactory.createForClass(FinancialTransaction);
//# sourceMappingURL=financial-transaction.schema.js.map