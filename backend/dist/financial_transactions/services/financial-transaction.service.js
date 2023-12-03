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
exports.FinancialTransactionService = void 0;
const common_1 = require("@nestjs/common");
const financial_transaction_repository_1 = require("../repository/financial-transaction.repository");
let FinancialTransactionService = class FinancialTransactionService {
    constructor(financialTransactionRepository) {
        this.financialTransactionRepository = financialTransactionRepository;
    }
    async create(createFinancialTransactionDto) {
        return await this.financialTransactionRepository.create(createFinancialTransactionDto);
    }
    async findAll(filter) {
        const { page, pageSize } = filter;
        const skip = (page - 1) * pageSize;
        const data = await this.financialTransactionRepository.findAll(filter, skip, parseInt(pageSize, 10));
        const total = await this.financialTransactionRepository.countAll(filter);
        const paginations = {
            page: page,
            pageSize: pageSize,
            total: total,
            totalPage: Math.ceil(total / pageSize) || 0,
        };
        return { data, paginations, messenger: 'success' };
    }
    async findOne(filter) {
        return await this.financialTransactionRepository.findOne(filter);
    }
    async update(id, updateFinancialTransactionDto) {
        return await this.financialTransactionRepository.update(id, updateFinancialTransactionDto);
    }
    remove(id) {
        return `This action removes a #${id} supplier`;
    }
};
FinancialTransactionService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [financial_transaction_repository_1.FinancialTransactionRepository])
], FinancialTransactionService);
exports.FinancialTransactionService = FinancialTransactionService;
//# sourceMappingURL=financial-transaction.service.js.map