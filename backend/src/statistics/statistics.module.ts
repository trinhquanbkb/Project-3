import { Global, Module } from '@nestjs/common';
import { StatisticsController } from './statistics.controller';
import { StatisticsService } from './statistics.service';
import { MulterModule } from '@nestjs/platform-express';
import { ProductItemsModule } from '../product_items/products.module';
import { ProductsModule } from 'src/products/products.module';

@Global()
@Module({
    imports: [ProductItemsModule, ProductsModule],
    controllers: [StatisticsController],
    providers: [StatisticsService],
    exports: [StatisticsService],
})
export class StatisticsModule {}
