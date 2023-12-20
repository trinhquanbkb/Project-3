import { Model } from 'mongoose';
import { ProductItemDocument } from '../schema/product.schema';
import { ProductItemDTO } from '../dto/products.dto';
export declare class OrdersService {
    private roleModel;
    constructor(roleModel: Model<ProductItemDocument>);
    createRole(roleDto: ProductItemDTO): Promise<ProductItemDocument>;
    findAllRoles(pagination: any, filter: any): Promise<{
        data: Omit<import("mongoose").Document<unknown, {}, ProductItemDocument> & import("../schema/product.schema").ProductItem & import("mongoose").Document<any, any, any> & {
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
    findRoleById(id: string): Promise<ProductItemDocument | null>;
    updateRole(id: string, roleDto: ProductItemDTO): Promise<ProductItemDocument | null>;
    deleteRole(id: string): Promise<ProductItemDocument | null>;
}
