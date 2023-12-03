import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ImagesModule } from './images/images.module';
import { RolesModule } from './roles/roles.module';
import { PermisstionsModule } from './permissions/permisstions.module';
import { WarehousesModule } from './warehouse/warehouses.module';
import { FinancialTransactionModule } from './financial_transactions/financial-transaction.module';
import { ProductsModule } from './products/products.module';
import { ProductItemsModule } from './product_items/products.module';
import { CategoriesModule } from './categories/categories.module';
import { OrdersModule } from './orders/orders.module';
import { SuppliersModule } from './suppliers/suppliers.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
    MongooseModule.forRoot(process.env.MONGO_DB),
    UsersModule,
    AuthModule,
    ImagesModule,
    RolesModule,
    PermisstionsModule,
    WarehousesModule,
    FinancialTransactionModule,
    ProductsModule,
    ProductItemsModule,
    CategoriesModule,
    OrdersModule,
    PermisstionsModule,
    SuppliersModule
  ],
})
export class AppModule {}
