import { Document } from 'mongoose';
export type FinancialTransactionsDocument = FinancialTransaction & Document;
export declare class FinancialTransaction {
    transaction_name: string;
    product_id: string;
    quantity: Number;
    unit_price: Number;
    total_amount: Number;
    type: String;
    status: String;
}
export declare const FinancialTransactionSchema: import("mongoose").Schema<Document<FinancialTransaction, any, any>, import("mongoose").Model<any, any, any>, undefined, any>;
