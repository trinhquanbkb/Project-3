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
exports.SuppliersRepository = void 0;
const mongoose_1 = require("mongoose");
const common_1 = require("@nestjs/common");
const mongoose_2 = require("@nestjs/mongoose");
const supplier_schema_1 = require("../schema/supplier.schema");
let SuppliersRepository = class SuppliersRepository {
    constructor(supplierModel) {
        this.supplierModel = supplierModel;
    }
    async findOne(filter) {
        return this.supplierModel.findOne(filter);
    }
    async create(createDto) {
        const created = new this.supplierModel(createDto);
        return await created.save();
    }
    async update(id, updateDto) {
        return this.supplierModel.findByIdAndUpdate(id, updateDto, { new: true });
    }
    async findAll(filter) {
        return this.supplierModel.find(filter);
    }
    async delete(_id) {
        return await this.supplierModel.findByIdAndDelete(_id);
    }
};
SuppliersRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_2.InjectModel)(supplier_schema_1.Supplier.name)),
    __metadata("design:paramtypes", [mongoose_1.Model])
], SuppliersRepository);
exports.SuppliersRepository = SuppliersRepository;
//# sourceMappingURL=supplier.repository.js.map