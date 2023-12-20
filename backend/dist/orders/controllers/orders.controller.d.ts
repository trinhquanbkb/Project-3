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
/// <reference types="mongoose" />
/// <reference types="mongoose/types/inferschematype" />
import { OrdersService } from '../services/orders.service';
import { OrdersDTO } from '../dto/orders.dto';
export declare class OrdersController {
    private readonly rolesService;
    constructor(rolesService: OrdersService);
    createRole(roleDto: OrdersDTO): Promise<import("../schema/order.schema").OrderDocument>;
    approve(id: string): Promise<import("../schema/order.schema").OrderDocument>;
    waiting(id: string): Promise<import("../schema/order.schema").OrderDocument>;
    cancel(id: string): Promise<import("../schema/order.schema").OrderDocument>;
    findAllRoles(pagination: any, filter: string): Promise<{
        data: Omit<import("mongoose").Document<unknown, {}, import("../schema/order.schema").OrderDocument> & import("../schema/order.schema").Order & import("mongoose").Document<any, any, any> & {
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
    findRoleById(id: string): Promise<import("../schema/order.schema").OrderDocument>;
    updateRole(id: string, roleDto: OrdersDTO): Promise<import("../schema/order.schema").OrderDocument>;
    deleteRole(id: string): Promise<import("../schema/order.schema").OrderDocument>;
}
