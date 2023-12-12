import { SuppliersService } from '../services/suppliers.service';
import { CreateSupplierDto } from '../dto/create-supplier.dto';
export declare class SuppliersController {
    private readonly rolesService;
    constructor(rolesService: SuppliersService);
    createRole(roleDto: CreateSupplierDto): Promise<import("../schema/supplier.schema").SupplierDocument>;
    findAllRoles(pagination: any, filter: string): Promise<{
        data: (import("mongoose").Document<unknown, {}, import("../schema/supplier.schema").SupplierDocument> & import("../schema/supplier.schema").Supplier & import("mongoose").Document<any, any, any> & {
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
    findRoleById(id: string): Promise<import("../schema/supplier.schema").SupplierDocument>;
    updateRole(id: string, roleDto: CreateSupplierDto): Promise<import("../schema/supplier.schema").SupplierDocument>;
    deleteRole(id: string): Promise<import("../schema/supplier.schema").SupplierDocument>;
}
