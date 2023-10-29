import { Document } from 'mongoose';
export type UserDocument = User & Document;
export declare class User {
    username: string;
    password?: string;
    role: Array<string>;
}
export declare const UserSchema: import("mongoose").Schema<Document<User, any, any>, import("mongoose").Model<any, any, any>, undefined, any>;
