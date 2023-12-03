<<<<<<< HEAD
import { FilterQuery } from 'mongoose';
import { CreateSupplierDto } from '../dto/create-supplier.dto';
import { UpdateSupplierDto } from '../dto/update-supplier.dto';
import { SuppliersRepository } from '../repository/supplier.repository';
export declare class SuppliersService {
    private readonly suppliersRepository;
    constructor(suppliersRepository: SuppliersRepository);
    create(createSupplierDto: CreateSupplierDto): Promise<import("../schema/supplier.schema").SupplierDocument>;
    findAll(): Promise<import("../schema/supplier.schema").SupplierDocument[]>;
    findOne(filter: FilterQuery<any>): Promise<import("../schema/supplier.schema").SupplierDocument>;
    update(id: string, updateSupplierDto: UpdateSupplierDto): Promise<import("../schema/supplier.schema").SupplierDocument>;
    remove(id: number): string;
}
=======
import { Model } from 'mongoose';
import { SupplierDocument } from '../schema/supplier.schema';
import { CreateSupplierDto } from '../dto/create-supplier.dto';
export declare class SuppliersService {
    private roleModel;
    constructor(roleModel: Model<SupplierDocument>);
    createRole(roleDto: CreateSupplierDto): Promise<SupplierDocument>;
    findAllRoles(pagination: any, filter: any): Promise<{
        data: (import("mongoose").Document<unknown, {}, SupplierDocument> & import("../schema/supplier.schema").Supplier & import("mongoose").Document<any, any, any> & {
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
    findRoleById(id: string): Promise<SupplierDocument | null>;
    updateRole(id: string, roleDto: CreateSupplierDto): Promise<SupplierDocument | null>;
    deleteRole(id: string): Promise<SupplierDocument | null>;
}
>>>>>>> master
