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
        data: Omit<import("mongoose").Document<unknown, {}, FinancialTransactionsDocument> & import("../schema/financial-transaction.schema").FinancialTransaction & import("mongoose").Document<any, any, any> & {
            _id: import("mongoose").Types.ObjectId;
        }, never>[];
        paginations: {
            page: any;
            pageSize: any;
            total: number;
            totalPage: number;
        };
        messenger: string;
    }>;
    findOne(id: string): Promise<FinancialTransactionsDocument | null>;
    update(id: string, roleDto: any): Promise<FinancialTransactionsDocument | null>;
    remove(id: string): Promise<FinancialTransactionsDocument | null>;
}
