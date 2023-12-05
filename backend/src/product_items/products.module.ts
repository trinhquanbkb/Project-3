import {  Module } from '@nestjs/common';
import { OrdersService } from './services/products.service';
import { OrdersController } from './controllers/products.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductItem, ProductItemSchema } from './schema/product.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: ProductItem.name, schema: ProductItemSchema }]),
  ],
  controllers: [OrdersController],
  providers: [OrdersService],
  exports: [],
})
export class ProductItemsModule {}
