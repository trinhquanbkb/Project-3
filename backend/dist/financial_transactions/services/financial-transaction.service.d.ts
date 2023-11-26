import { FilterQuery } from 'mongoose';
import { CreateFinancialTransactionDto } from '../dto/create-financial-transaction.dto';
import { UpdateFinancialTransactionDto } from '../dto/update-financial-transaction.dto';
import { FinancialTransactionRepository } from '../repository/financial-transaction.repository';
export declare class FinancialTransactionService {
    private readonly financialTransactionRepository;
    constructor(financialTransactionRepository: FinancialTransactionRepository);
    create(createFinancialTransactionDto: CreateFinancialTransactionDto): Promise<import("../schema/financial-transaction.schema").FinancialTransactionsDocument>;
    findAll(): Promise<import("../schema/financial-transaction.schema").FinancialTransactionsDocument[]>;
    findOne(filter: FilterQuery<any>): Promise<import("../schema/financial-transaction.schema").FinancialTransactionsDocument>;
    update(id: string, updateFinancialTransactionDto: UpdateFinancialTransactionDto): Promise<import("../schema/financial-transaction.schema").FinancialTransactionsDocument>;
    remove(id: number): string;
}
