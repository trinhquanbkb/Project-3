"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductItemsModule = void 0;
const common_1 = require("@nestjs/common");
const products_service_1 = require("./services/products.service");
const products_controller_1 = require("./controllers/products.controller");
const mongoose_1 = require("@nestjs/mongoose");
const product_schema_1 = require("./schema/product.schema");
let ProductItemsModule = class ProductItemsModule {
};
ProductItemsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: product_schema_1.ProductItem.name, schema: product_schema_1.ProductItemSchema }]),
        ],
        controllers: [products_controller_1.OrdersController],
        providers: [products_service_1.OrdersService],
        exports: [products_service_1.OrdersService],
    })
], ProductItemsModule);
exports.ProductItemsModule = ProductItemsModule;
//# sourceMappingURL=products.module.js.map