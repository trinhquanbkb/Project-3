<<<<<<< HEAD
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
=======
import { Model } from 'mongoose';
import { FinancialTransactionsDocument } from '../schema/financial-transaction.schema';
import { CreateFinancialTransactionDto } from '../dto/create-financial-transaction.dto';
import { ProductDocument } from 'src/products/schema/product.schema';
import { ProductItemDocument } from 'src/product_items/schema/product.schema';
export declare class FinancialTransactionService {
    private roleModel;
    private productModel;
    private productItemModel;
    constructor(roleModel: Model<FinancialTransactionsDocument>, productModel: Model<ProductDocument>, productItemModel: Model<ProductItemDocument>);
    create(roleDto: CreateFinancialTransactionDto): Promise<FinancialTransactionsDocument>;
    findAll(pagination: any, filter: any): Promise<{
        data: (import("mongoose").Document<unknown, {}, FinancialTransactionsDocument> & import("../schema/financial-transaction.schema").FinancialTransaction & import("mongoose").Document<any, any, any> & {
            _id: import("mongoose").Types.ObjectId;
        })[];
        paginations: {
            page: any;
            pageSize: any;
            total: number;
            totalPage: number;
        };
        messenger: string;
    }>;
    findOne(id: string): Promise<FinancialTransactionsDocument | null>;
    update(id: string, roleDto: CreateFinancialTransactionDto): Promise<FinancialTransactionsDocument | null>;
    remove(id: string): Promise<FinancialTransactionsDocument | null>;
}
>>>>>>> master
