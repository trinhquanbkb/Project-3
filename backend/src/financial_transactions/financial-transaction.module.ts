import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FinancialTransaction, FinancialTransactionSchema } from './schema/financial-transaction.schema';
import { FinancialTransactionController } from './controllers/financial-transaction.controller';
import { FinancialTransactionService } from './services/financial-transaction.service';
import { FinancialTransactionRepository } from './repository/financial-transaction.repository';

@Module({
  imports: [MongooseModule.forFeature([{ name: FinancialTransaction.name, schema: FinancialTransactionSchema }]),
  ],
  controllers: [FinancialTransactionController],
  providers: [FinancialTransactionService, FinancialTransactionRepository],
})
export class FinancialTransactionModule {}
