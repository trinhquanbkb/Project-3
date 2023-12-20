import { OrdersService } from '../services/products.service';
import { ProductItemDTO } from '../dto/products.dto';
export declare class OrdersController {
    private readonly rolesService;
    constructor(rolesService: OrdersService);
    createRole(roleDto: ProductItemDTO): Promise<import("../schema/product.schema").ProductItemDocument>;
    findAllRoles(pagination: any, filter: string): Promise<{
        data: Omit<import("mongoose").Document<unknown, {}, import("../schema/product.schema").ProductItemDocument> & import("../schema/product.schema").ProductItem & import("mongoose").Document<any, any, any> & {
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
    findRoleById(id: string): Promise<import("../schema/product.schema").ProductItemDocument>;
    updateRole(id: string, roleDto: ProductItemDTO): Promise<import("../schema/product.schema").ProductItemDocument>;
    deleteRole(id: string): Promise<import("../schema/product.schema").ProductItemDocument>;
}
