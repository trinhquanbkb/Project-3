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
import { Model } from 'mongoose';
import { OrderDocument } from '../schema/order.schema';
import { OrdersDTO } from '../dto/orders.dto';
import { ProductItemDocument } from 'src/product_items/schema/product.schema';
export declare class OrdersService {
    private roleModel;
    private productItemModel;
    constructor(roleModel: Model<OrderDocument>, productItemModel: Model<ProductItemDocument>);
    createRole(roleDto: OrdersDTO): Promise<OrderDocument>;
    findAllRoles(pagination: any, filter: any): Promise<{
        data: Omit<import("mongoose").Document<unknown, {}, OrderDocument> & import("../schema/order.schema").Order & import("mongoose").Document<any, any, any> & {
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
    findRoleById(id: string): Promise<OrderDocument | null>;
    update(id: string, roleDto: any): Promise<OrderDocument | null>;
    deleteRole(id: string): Promise<OrderDocument | null>;
}
