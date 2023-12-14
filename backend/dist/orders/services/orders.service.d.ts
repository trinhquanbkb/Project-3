import { Model } from 'mongoose';
import { OrderDocument } from '../schema/order.schema';
import { OrdersDTO } from '../dto/orders.dto';
export declare class OrdersService {
    private roleModel;
    constructor(roleModel: Model<OrderDocument>);
    createRole(roleDto: OrdersDTO): Promise<OrderDocument>;
    findAllRoles(pagination: any, filter: any): Promise<{
        data: (import("mongoose").Document<unknown, {}, OrderDocument> & import("../schema/order.schema").Order & import("mongoose").Document<any, any, any> & {
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
    findRoleById(id: string): Promise<OrderDocument | null>;
    updateRole(id: string, roleDto: OrdersDTO): Promise<OrderDocument | null>;
    deleteRole(id: string): Promise<OrderDocument | null>;
}
