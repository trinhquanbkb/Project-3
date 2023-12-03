import { FilterQuery, Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateFinancialTransactionDto } from '../dto/create-financial-transaction.dto';
import { UpdateFinancialTransactionDto } from '../dto/update-financial-transaction.dto';
import {
  FinancialTransaction,
  FinancialTransactionsDocument,
} from '../schema/financial-transaction.schema';

@Injectable()
export class FinancialTransactionRepository {
  constructor(
    @InjectModel(FinancialTransaction.name)
    private FinancialTransactionModel: Model<FinancialTransactionsDocument>,
  ) {}

  async findOne(
    filter: FilterQuery<any>,
  ): Promise<FinancialTransactionsDocument | null> {
    return this.FinancialTransactionModel.findOne(filter);
  }

  async create(
    createDto: CreateFinancialTransactionDto,
  ): Promise<FinancialTransactionsDocument> {
    const created = new this.FinancialTransactionModel(createDto);
    return await created.save();
  }

  async update(
    id: string,
    updateDto: Partial<UpdateFinancialTransactionDto>,
  ): Promise<FinancialTransactionsDocument> {
    return this.FinancialTransactionModel.findByIdAndUpdate(id, updateDto, {
      new: true,
    });
  }

  async findAll(
    filter: FilterQuery<any>,
    skip: number,
    limit: number,
  ): Promise<FinancialTransactionsDocument[]> {
    return this.FinancialTransactionModel.find(filter)
      .skip(skip)
      .limit(limit)
      .exec();
  }

  async delete(_id: string): Promise<FinancialTransactionsDocument | null> {
    return await this.FinancialTransactionModel.findByIdAndDelete(_id);
  }

  async countAll(filter: FilterQuery<any>): Promise<number> {
    return this.FinancialTransactionModel.countDocuments(filter).exec();
  }
}
