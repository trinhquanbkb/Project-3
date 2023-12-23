import { CategoriesService } from '../services/categories.service';
import { CategoryDTO } from '../dto/category.dto';
export declare class CategoriesController {
    private readonly rolesService;
    constructor(rolesService: CategoriesService);
    createRole(roleDto: CategoryDTO): Promise<import("../schema/category.schema").CategoryDocument>;
    findAllRoles(pagination: any, filter: string): Promise<{
        data: (import("mongoose").Document<unknown, {}, import("../schema/category.schema").CategoryDocument> & import("../schema/category.schema").Category & import("mongoose").Document<any, any, any> & {
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
    findRoleById(id: string): Promise<import("../schema/category.schema").CategoryDocument>;
    updateRole(id: string, roleDto: CategoryDTO): Promise<import("../schema/category.schema").CategoryDocument>;
    deleteRole(id: string): Promise<import("../categories.module").CategoriesModule>;
}
