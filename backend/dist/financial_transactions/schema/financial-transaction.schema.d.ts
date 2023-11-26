/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose/types/inferschematype" />
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
export declare const FinancialTransactionSchema: import("mongoose").Schema<FinancialTransaction, import("mongoose").Model<FinancialTransaction, any, any, any, Document<unknown, any, FinancialTransaction> & FinancialTransaction & {
    _id: import("mongoose").Types.ObjectId;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, FinancialTransaction, Document<unknown, {}, import("mongoose").FlatRecord<FinancialTransaction>> & import("mongoose").FlatRecord<FinancialTransaction> & {
    _id: import("mongoose").Types.ObjectId;
}>;
