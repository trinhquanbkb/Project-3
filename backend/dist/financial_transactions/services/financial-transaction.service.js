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
exports.FinancialTransactionService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("mongoose");
const mongoose_2 = require("@nestjs/mongoose");
const product_schema_1 = require("../../products/schema/product.schema");
const product_schema_2 = require("../../product_items/schema/product.schema");
let FinancialTransactionService = class FinancialTransactionService {
    constructor(roleModel, productModel, productItemModel) {
        this.roleModel = roleModel;
        this.productModel = productModel;
        this.productItemModel = productItemModel;
    }
    async create(roleDto) {
        const productItems = await this.productItemModel.insertMany(roleDto.products.map((product) => ({
            expriry_data: product.expriry_data,
            quantity: product.quantity,
            price: product.price,
            warehouse_id: roleDto.warehouseId,
            supplier_id: roleDto.supplierId,
            product_id: product.product_id,
            weight: product.weight,
            quantity_sold: 0,
            hide: true,
        })));
        const createdRole = new this.roleModel(Object.assign(Object.assign({}, roleDto), { products: productItems.map((productItem) => productItem._id.toString()) }));
        return createdRole.save();
    }
    async findAll(pagination, filter) {
        const { page, pageSize } = pagination;
        const skip = (page - 1) * pageSize;
        let filterData = {};
        if (filter.code !== '') {
            filterData['_id'] = filter.code;
        }
        else {
            filterData = {};
        }
        const data = await this.roleModel
            .find(filterData)
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(parseInt(pageSize, 10))
            .populate([
            {
                path: 'warehouseId',
                model: 'Warehouse',
            },
            {
                path: 'supplierId',
                model: 'Supplier',
            },
            {
                path: 'products',
                model: 'ProductItem',
            },
        ])
            .exec();
        const total = await this.roleModel.countDocuments(filterData).exec();
        const paginations = {
            page: page,
            pageSize: pageSize,
            total: total,
            totalPage: Math.ceil(total / pageSize),
        };
        return { data, paginations, messenger: 'success' };
    }
    async findOne(id) {
        return this.roleModel
            .findById(id)
            .populate([
            {
                path: 'warehouseId',
                model: 'Warehouse',
            },
            {
                path: 'supplierId',
                model: 'Supplier',
            },
            {
                path: 'products',
                model: 'ProductItem',
                populate: {
                    path: 'product_id',
                    model: 'Product',
                },
            },
        ])
            .exec();
    }
    async update(id, roleDto) {
        if (roleDto.status == 'Thành công') {
            const data = await this.roleModel.findById(id);
            if (data) {
                this.productItemModel.updateMany({ _id: { $in: data.products } }, { $set: { hide: false } }).exec();
            }
        }
        return this.roleModel.findByIdAndUpdate(id, roleDto, { new: true }).exec();
    }
    async remove(id) {
        return this.roleModel.findByIdAndRemove(id).exec();
    }
};
FinancialTransactionService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_2.InjectModel)('FinancialTransaction')),
    __param(1, (0, mongoose_2.InjectModel)('Product')),
    __param(2, (0, mongoose_2.InjectModel)('ProductItem')),
    __metadata("design:paramtypes", [mongoose_1.Model,
        mongoose_1.Model,
        mongoose_1.Model])
], FinancialTransactionService);
exports.FinancialTransactionService = FinancialTransactionService;
//# sourceMappingURL=financial-transaction.service.js.map