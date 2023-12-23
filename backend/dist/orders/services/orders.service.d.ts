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
