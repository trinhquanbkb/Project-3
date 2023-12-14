import { OrdersService } from '../services/orders.service';
import { OrdersDTO } from '../dto/orders.dto';
export declare class OrdersController {
    private readonly rolesService;
    constructor(rolesService: OrdersService);
    createRole(roleDto: OrdersDTO): Promise<import("../schema/order.schema").OrderDocument>;
    findAllRoles(pagination: any, filter: string): Promise<{
        data: (import("mongoose").Document<unknown, {}, import("../schema/order.schema").OrderDocument> & import("../schema/order.schema").Order & import("mongoose").Document<any, any, any> & {
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
    findRoleById(id: string): Promise<import("../schema/order.schema").OrderDocument>;
    updateRole(id: string, roleDto: OrdersDTO): Promise<import("../schema/order.schema").OrderDocument>;
    deleteRole(id: string): Promise<import("../schema/order.schema").OrderDocument>;
}
