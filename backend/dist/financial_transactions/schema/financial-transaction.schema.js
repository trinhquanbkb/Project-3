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
const warehouse_schema_1 = require("../../warehouse/schema/warehouse.schema");
let FinancialTransaction = class FinancialTransaction {
};
__decorate([
    (0, mongoose_1.Prop)({
        require: true,
        type: String,
    }),
    __metadata("design:type", String)
], FinancialTransaction.prototype, "id", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        require: true,
        type: Number,
    }),
    __metadata("design:type", Number)
], FinancialTransaction.prototype, "weight", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        require: true,
        type: String
    }),
    __metadata("design:type", String)
], FinancialTransaction.prototype, "supplierId", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        require: true,
        type: String,
    }),
    __metadata("design:type", String)
], FinancialTransaction.prototype, "warehouseId", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        require: true,
        type: String
    }),
    __metadata("design:type", String)
], FinancialTransaction.prototype, "note", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        require: true,
        type: String
    }),
    __metadata("design:type", String)
], FinancialTransaction.prototype, "status", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        require: true,
        type: (Array)
    }),
    __metadata("design:type", Array)
], FinancialTransaction.prototype, "products", void 0);
FinancialTransaction = __decorate([
    (0, mongoose_1.Schema)({
        timestamps: true
    })
], FinancialTransaction);
exports.FinancialTransaction = FinancialTransaction;
exports.FinancialTransactionSchema = mongoose_1.SchemaFactory.createForClass(FinancialTransaction);
//# sourceMappingURL=financial-transaction.schema.js.map