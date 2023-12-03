import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ImagesModule } from './images/images.module';
import { RolesModule } from './roles/roles.module';
import { PermisstionsModule } from './permissions/permisstions.module';
import { WarehousesModule } from './warehouse/warehouses.module';
import { OrdersModule } from './orders/orders.module';
import { ProductsModule } from './products/products.module';
import { ProductItemsModule } from './product_items/products.module';
import { SuppliersModule } from './suppliers/suppliers.module';
import { FinancialTransactionModule } from './financial_transactions/financial-transaction.module';

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
    OrdersModule,
    ProductsModule,
    ProductItemsModule,
    SuppliersModule,
    FinancialTransactionModule,
  ],
})
export class AppModule { }
