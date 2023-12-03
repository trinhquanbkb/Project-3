import { Document } from 'mongoose';
export type categoryDocument = category & Document;
export declare class category {
    category_name: string;
}
export declare const categorySchema: import("mongoose").Schema<Document<category, any, any>, import("mongoose").Model<any, any, any>, undefined, any>;
