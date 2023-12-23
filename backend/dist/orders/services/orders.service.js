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
exports.OrdersService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("mongoose");
const mongoose_2 = require("@nestjs/mongoose");
const product_schema_1 = require("../../product_items/schema/product.schema");
let OrdersService = class OrdersService {
    constructor(roleModel, productItemModel) {
        this.roleModel = roleModel;
        this.productItemModel = productItemModel;
    }
    async createRole(roleDto) {
        const product_items = [];
        roleDto.products.forEach((product) => product.product_item.forEach((product_item) => product_items.push({
            id: product_item.product_item_id,
            quantity: product_item.quantity,
        })));
        const updateOperations = product_items.map((update) => ({
            updateOne: {
                filter: { id: update.id },
                update: {
                    $inc: { quantity: -update.quantity, quantity_sold: +update.quantity },
                },
            },
        }));
        this.productItemModel
            .bulkWrite(updateOperations)
            .then((result) => {
            console.log(result);
        })
            .catch((error) => {
            console.error(error);
        });
        const result = Object.assign(Object.assign({}, roleDto), { status: 'Chờ duyệt', shipping_id: '' });
        const createdRole = new this.roleModel(result);
        return createdRole.save();
    }
    async findAllRoles(pagination, filter) {
        const { page, pageSize } = pagination;
        const skip = (page - 1) * pageSize;
        const data = await this.roleModel
            .find()
            .skip(skip)
            .limit(parseInt(pageSize, 10))
            .populate([
            {
                path: 'shipping_id',
                model: 'Shipping',
            },
            {
                path: 'products.product_id',
                model: 'Product',
                select: 'product_name category url',
            },
            {
                path: 'products.product_item.product_item_id',
                model: 'ProductItem',
                populate: [
                    {
                        path: 'warehouse_id',
                        model: 'Warehouse',
                    },
                    {
                        path: 'supplier_id',
                        model: 'Supplier',
                    },
                ],
            },
        ])
            .exec();
        const total = await this.roleModel.countDocuments().exec();
        const paginations = {
            page: page,
            pageSize: pageSize,
            total: total,
            totalPage: Math.ceil(total / pageSize),
        };
        return { data, paginations, messenger: 'succes' };
    }
    async findRoleById(id) {
        return this.roleModel
            .findById(id)
            .populate([
            {
                path: 'products.product_id',
                model: 'Product',
            },
        ])
            .exec();
    }
    async update(id, roleDto) {
        return this.roleModel.findByIdAndUpdate(id, roleDto, { new: true }).exec();
    }
    async deleteRole(id) {
        return this.roleModel.findByIdAndRemove(id).exec();
    }
};
OrdersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_2.InjectModel)('Order')),
    __param(1, (0, mongoose_2.InjectModel)('ProductItem')),
    __metadata("design:paramtypes", [mongoose_1.Model,
        mongoose_1.Model])
], OrdersService);
exports.OrdersService = OrdersService;
//# sourceMappingURL=orders.service.js.map