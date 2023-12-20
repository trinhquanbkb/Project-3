import { Model } from 'mongoose';
import { CategoryDocument } from '../schema/category.schema';
import { CategoryDTO } from '../dto/category.dto';
import { CategoriesModule } from '../categories.module';
export declare class CategoriesService {
    private roleModel;
    constructor(roleModel: Model<CategoryDocument>);
    createRole(roleDto: CategoryDTO): Promise<CategoryDocument>;
    findAllRoles(pagination: any, filter: any): Promise<{
        data: (import("mongoose").Document<unknown, {}, CategoryDocument> & import("../schema/category.schema").Category & import("mongoose").Document<any, any, any> & {
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
    findRoleById(id: string): Promise<CategoryDocument | null>;
    updateRole(id: string, roleDto: CategoryDTO): Promise<CategoryDocument | null>;
    deleteRole(id: string): Promise<CategoriesModule | null>;
}
