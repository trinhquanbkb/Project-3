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
exports.SuppliersService = void 0;
const common_1 = require("@nestjs/common");
const supplier_repository_1 = require("../repository/supplier.repository");
let SuppliersService = class SuppliersService {
    constructor(suppliersRepository) {
        this.suppliersRepository = suppliersRepository;
    }
    async create(createSupplierDto) {
        return await this.suppliersRepository.create(createSupplierDto);
    }
    async findAll() {
        return await this.suppliersRepository.findAll();
    }
    async findOne(filter) {
        return await this.suppliersRepository.findOne(filter);
    }
    async update(id, updateSupplierDto) {
        return await this.suppliersRepository.update(id, updateSupplierDto);
    }
    remove(id) {
        return `This action removes a #${id} supplier`;
    }
};
SuppliersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [supplier_repository_1.SuppliersRepository])
], SuppliersService);
exports.SuppliersService = SuppliersService;
//# sourceMappingURL=suppliers.service.js.map