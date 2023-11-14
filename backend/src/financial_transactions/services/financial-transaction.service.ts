import { Injectable } from '@nestjs/common';
import { FilterQuery } from 'mongoose';
import { CreateFinancialTransactionDto } from '../dto/create-financial-transaction.dto';
import { UpdateFinancialTransactionDto } from '../dto/update-financial-transaction.dto';
import { FinancialTransactionRepository } from '../repository/financial-transaction.repository';

@Injectable()
export class FinancialTransactionService {
  constructor(private readonly financialTransactionRepository: FinancialTransactionRepository) {}
  async create(createFinancialTransactionDto: CreateFinancialTransactionDto) {
    return await this.financialTransactionRepository.create(createFinancialTransactionDto);
  }

  async findAll() {
    return await this.financialTransactionRepository.findAll();
  }

  async findOne(filter: FilterQuery<any>) {
    return await this.financialTransactionRepository.findOne(filter);
  }

  async update(id: string, updateFinancialTransactionDto: UpdateFinancialTransactionDto) {
    return await this.financialTransactionRepository.update(id, updateFinancialTransactionDto);
  }

  remove(id: number) {
    return `This action removes a #${id} supplier`;
  }
}
