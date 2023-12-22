import { Global, Module } from '@nestjs/common';
import { TopProductController } from './top_product.controller';
import { MulterModule } from '@nestjs/platform-express';
import { ProductItemsModule } from '../product_items/products.module';
import { ProductsModule } from 'src/products/products.module';

@Global()
@Module({
    imports: [ProductItemsModule, ProductsModule],
    controllers: [TopProductController],
    // providers: [StatisticsService],
    // exports: [StatisticsService],
})
export class TopProductModule {}
