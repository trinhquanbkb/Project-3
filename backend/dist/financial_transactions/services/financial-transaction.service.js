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
        const createdRole = new this.roleModel(roleDto);
        const products = [...roleDto.products];
        const promises = products.map(async (element) => {
            const newProductItem = new this.productItemModel({
                expriry_data: "20/11/2023",
                quantity: Number(element.quantity),
                price: Number(element.price),
                warehouse_id: '' + roleDto.warehouseId,
                supplier_id: '' + roleDto.supplierId,
            });
            const productItem = await newProductItem.save();
            const product = await this.productModel.findOne({ product_name: element.name });
            if (product === null || product === void 0 ? void 0 : product._id) {
                const { category, products_items_item, quantity } = product;
                await this.productModel.findByIdAndUpdate(product._id, {
                    category: [...category, element.category],
                    quantity: quantity + Number(element.quantity),
                    products_items_item: [...products_items_item, productItem._id.toString()],
                });
            }
            else {
                let d = new this.productModel({
                    "product_name": element.name,
                    "quantity": element.quantity,
                    "category": [
                        element.category
                    ],
                    "url": "https://png.pngtree.com/png-vector/20190701/ourlarge/pngtree-package-icon-for-your-project-png-image_1533313.jpg",
                    "products_items_item": [productItem._id.toString()]
                });
                d.save();
            }
        });
        await Promise.all(promises);
        return createdRole.save();
    }
    async findAll(pagination, filter) {
        const { page, pageSize } = pagination;
        const skip = (page - 1) * pageSize;
        const data = await this.roleModel.find(filter).sort({ createdAt: -1 }).skip(skip).limit(parseInt(pageSize, 10)).exec();
        ;
        const total = await this.roleModel.countDocuments(filter).exec();
        const paginations = {
            "page": page,
            "pageSize": pageSize,
            "total": total,
            "totalPage": Math.ceil(total / pageSize)
        };
        return { data, paginations, messenger: "succes" };
    }
    async findOne(id) {
        return this.roleModel.findById(id).exec();
    }
    async update(id, roleDto) {
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