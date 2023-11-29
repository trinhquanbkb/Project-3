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
exports.WarehousesService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("mongoose");
const mongoose_2 = require("@nestjs/mongoose");
let WarehousesService = class WarehousesService {
    constructor(warehouseModel) {
        this.warehouseModel = warehouseModel;
    }
    async createWarehouse(warehouseDto) {
        const createdWarehouse = new this.warehouseModel(warehouseDto);
        return createdWarehouse.save();
    }
    async findAllWarehouse(pagination, filter) {
        const { page, pageSize } = pagination;
        const skip = (page - 1) * pageSize;
        const data = await this.warehouseModel
            .find(filter)
            .skip(skip)
            .limit(parseInt(pageSize, 10))
            .exec();
        const total = await this.warehouseModel.countDocuments(filter).exec();
        const paginations = {
            page: page,
            pageSize: pageSize,
            total: total,
            totalPage: Math.ceil(total / pageSize),
        };
        return { data, paginations, messenger: 'succes' };
    }
    async findWarehouseById(id) {
        return this.warehouseModel.findById(id).exec();
    }
    async updateWarehouse(id, warehouseDto) {
        return this.warehouseModel
            .findByIdAndUpdate(id, warehouseDto, { new: true })
            .exec();
    }
    async deleteWarehouse(id) {
        return this.warehouseModel.findByIdAndRemove(id).exec();
    }
};
WarehousesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_2.InjectModel)('Warehouse')),
    __metadata("design:paramtypes", [mongoose_1.Model])
], WarehousesService);
exports.WarehousesService = WarehousesService;
//# sourceMappingURL=warehouses.service.js.map