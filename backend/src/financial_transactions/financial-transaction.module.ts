import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FinancialTransaction, FinancialTransactionSchema } from './schema/financial-transaction.schema';
import { FinancialTransactionController } from './controllers/financial-transaction.controller';
import { FinancialTransactionService } from './services/financial-transaction.service';
import { Product, ProductSchema } from 'src/products/schema/product.schema';
import { ProductItem, ProductItemSchema } from 'src/product_items/schema/product.schema';
@Module({
  imports: [MongooseModule.forFeature([{ name: FinancialTransaction.name, schema: FinancialTransactionSchema }, { name: Product.name, schema: ProductSchema },
  { name: ProductItem.name, schema: ProductItemSchema },]),
  ],
  controllers: [FinancialTransactionController],
  providers: [FinancialTransactionService],
})
export class FinancialTransactionModule { }
