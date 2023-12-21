import {  Module } from '@nestjs/common';
import { OrdersServiceProduct } from './services/products.service';
import { OrdersController } from './controllers/products.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductSchema } from './schema/product.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),
  ],
  controllers: [OrdersController],
  providers: [OrdersServiceProduct],
  exports: [OrdersServiceProduct],
})
export class ProductsModule {}
