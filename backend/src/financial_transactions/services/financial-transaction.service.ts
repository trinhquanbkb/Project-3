import { Injectable } from '@nestjs/common';
import { FilterQuery } from 'mongoose';
import { CreateFinancialTransactionDto } from '../dto/create-financial-transaction.dto';
import { UpdateFinancialTransactionDto } from '../dto/update-financial-transaction.dto';
import { FinancialTransactionRepository } from '../repository/financial-transaction.repository';

@Injectable()
export class FinancialTransactionService {
  constructor(
    private readonly financialTransactionRepository: FinancialTransactionRepository,
  ) {}
  async create(createFinancialTransactionDto: CreateFinancialTransactionDto) {
    return await this.financialTransactionRepository.create(
      createFinancialTransactionDto,
    );
  }

  async findAll(filter: FilterQuery<any>) {
    const { page, pageSize } = filter;
    const skip = (page - 1) * pageSize;
    const data = await this.financialTransactionRepository.findAll(
      filter,
      skip,
      parseInt(pageSize, 10),
    );
    const total = await this.financialTransactionRepository.countAll(filter);
    const paginations = {
      page: page,
      pageSize: pageSize,
      total: total,
      totalPage: Math.ceil(total / pageSize) || 0,
    };
    return { data, paginations, messenger: 'success' };
  }

  async findOne(filter: FilterQuery<any>) {
    return await this.financialTransactionRepository.findOne(filter);
  }

  async update(
    id: string,
    updateFinancialTransactionDto: UpdateFinancialTransactionDto,
  ) {
    return await this.financialTransactionRepository.update(
      id,
      updateFinancialTransactionDto,
    );
  }

  remove(id: number) {
    return `This action removes a #${id} supplier`;
  }
}
