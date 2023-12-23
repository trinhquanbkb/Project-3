import {  Global, Module } from '@nestjs/common';
import { OrdersService } from './services/products.service';
import { OrdersController } from './controllers/products.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductItem, ProductItemSchema } from './schema/product.schema';
import { Product, ProductSchema } from 'src/products/schema/product.schema';

@Global()
@Module({
  imports: [
    MongooseModule.forFeature([{ name: ProductItem.name, schema: ProductItemSchema },{ name: Product.name, schema: ProductSchema }]),
  ],
  controllers: [OrdersController],
  providers: [OrdersService],
  exports: [OrdersService],
})
export class ProductItemsModule {}
