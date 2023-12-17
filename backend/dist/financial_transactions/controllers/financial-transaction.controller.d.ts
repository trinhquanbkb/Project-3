import { FinancialTransactionService } from '../services/financial-transaction.service';
import { CreateFinancialTransactionDto } from '../dto/create-financial-transaction.dto';
export declare class FinancialTransactionController {
    private readonly financialTransactionService;
    constructor(financialTransactionService: FinancialTransactionService);
    create(createFinancialTransactionDto: CreateFinancialTransactionDto): Promise<import("../schema/financial-transaction.schema").FinancialTransactionsDocument>;
    findAll(pagination: any, filter: string): Promise<{
        data: Omit<import("mongoose").Document<unknown, {}, import("../schema/financial-transaction.schema").FinancialTransactionsDocument> & import("../schema/financial-transaction.schema").FinancialTransaction & import("mongoose").Document<any, any, any> & {
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
    findOne(id: string): Promise<import("../schema/financial-transaction.schema").FinancialTransactionsDocument>;
    update(id: string, updateFinancialTransactionDto: CreateFinancialTransactionDto): Promise<import("../schema/financial-transaction.schema").FinancialTransactionsDocument>;
    remove(id: string): Promise<import("../schema/financial-transaction.schema").FinancialTransactionsDocument>;
}
