import { FilterQuery, Model } from 'mongoose';
import { CreateFinancialTransactionDto } from '../dto/create-financial-transaction.dto';
import { UpdateFinancialTransactionDto } from '../dto/update-financial-transaction.dto';
import { FinancialTransactionsDocument } from '../schema/financial-transaction.schema';
export declare class FinancialTransactionRepository {
    private FinancialTransactionModel;
    constructor(FinancialTransactionModel: Model<FinancialTransactionsDocument>);
    findOne(filter: FilterQuery<any>): Promise<FinancialTransactionsDocument | null>;
    create(createDto: CreateFinancialTransactionDto): Promise<FinancialTransactionsDocument>;
    update(id: string, updateDto: Partial<UpdateFinancialTransactionDto>): Promise<FinancialTransactionsDocument>;
    findAll(filter: FilterQuery<any>, skip: number, limit: number): Promise<FinancialTransactionsDocument[]>;
    delete(_id: string): Promise<FinancialTransactionsDocument | null>;
    countAll(filter: FilterQuery<any>): Promise<number>;
}
