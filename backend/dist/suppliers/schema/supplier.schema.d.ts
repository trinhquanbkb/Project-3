import { Document } from 'mongoose';
export type SupplierDocument = Supplier & Document;
export declare class Supplier {
    supplier_name: string;
    address: string;
    phone: string;
    email: string;
}
export declare const SupplierSchema: import("mongoose").Schema<Document<Supplier, any, any>, import("mongoose").Model<any, any, any>, undefined, any>;
