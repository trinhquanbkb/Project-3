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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FinancialTransactionController = void 0;
const swagger_1 = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const financial_transaction_service_1 = require("../services/financial-transaction.service");
const create_financial_transaction_dto_1 = require("../dto/create-financial-transaction.dto");
const update_financial_transaction_dto_1 = require("../dto/update-financial-transaction.dto");
const jwt_guard_1 = require("../../auth/guards/jwt.guard");
let FinancialTransactionController = class FinancialTransactionController {
    constructor(financialTransactionService) {
        this.financialTransactionService = financialTransactionService;
    }
    create(createFinancialTransactionDto) {
        return this.financialTransactionService.create(createFinancialTransactionDto);
    }
    findAll() {
        return this.financialTransactionService.findAll();
    }
    findOne(id) {
        return this.financialTransactionService.findOne({ _id: id });
    }
    update(id, updateFinancialTransactionDto) {
        return this.financialTransactionService.update(id, updateFinancialTransactionDto);
    }
    remove(id) {
        return this.financialTransactionService.remove(+id);
    }
};
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_financial_transaction_dto_1.CreateFinancialTransactionDto]),
    __metadata("design:returntype", void 0)
], FinancialTransactionController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], FinancialTransactionController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], FinancialTransactionController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_financial_transaction_dto_1.UpdateFinancialTransactionDto]),
    __metadata("design:returntype", void 0)
], FinancialTransactionController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], FinancialTransactionController.prototype, "remove", null);
FinancialTransactionController = __decorate([
    (0, common_1.Controller)('FinancialTransaction'),
    (0, swagger_1.ApiTags)('FinancialTransaction'),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)('authorization'),
    __metadata("design:paramtypes", [financial_transaction_service_1.FinancialTransactionService])
], FinancialTransactionController);
exports.FinancialTransactionController = FinancialTransactionController;
//# sourceMappingURL=financial-transaction.controller.js.map