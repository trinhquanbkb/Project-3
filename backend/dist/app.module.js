"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const config_1 = require("@nestjs/config");
const users_module_1 = require("./users/users.module");
const auth_module_1 = require("./auth/auth.module");
const images_module_1 = require("./images/images.module");
const roles_module_1 = require("./roles/roles.module");
const permisstions_module_1 = require("./permissions/permisstions.module");
const warehouses_module_1 = require("./warehouse/warehouses.module");
const financial_transaction_module_1 = require("./financial_transactions/financial-transaction.module");
const products_module_1 = require("./products/products.module");
const products_module_2 = require("./product_items/products.module");
const categories_module_1 = require("./categories/categories.module");
const orders_module_1 = require("./orders/orders.module");
const suppliers_module_1 = require("./suppliers/suppliers.module");
const statistics_module_1 = require("./statistics/statistics.module");
const top_product_module_1 = require("./top_product/top_product.module");
const inventory_products_module_1 = require("./inventory_products/inventory_products.module");
const XSSRequestWrapper_1 = require("./middlewares/XSSRequestWrapper");
const shipping_module_1 = require("./shipping/shipping.module");
let AppModule = class AppModule {
    configure(consumer) {
        consumer.apply(XSSRequestWrapper_1.XSSRequestWrapper).forRoutes('*');
    }
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
            mongoose_1.MongooseModule.forRoot(process.env.MONGO_DB),
            users_module_1.UsersModule,
            auth_module_1.AuthModule,
            images_module_1.ImagesModule,
            roles_module_1.RolesModule,
            permisstions_module_1.PermisstionsModule,
            warehouses_module_1.WarehousesModule,
            financial_transaction_module_1.FinancialTransactionModule,
            products_module_1.ProductsModule,
            products_module_2.ProductItemsModule,
            categories_module_1.CategoriesModule,
            orders_module_1.OrdersModule,
            permisstions_module_1.PermisstionsModule,
            suppliers_module_1.SuppliersModule,
            statistics_module_1.StatisticsModule,
            top_product_module_1.TopProductModule,
            inventory_products_module_1.InventoryProductsModule,
            shipping_module_1.ShippingsModule
        ],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map