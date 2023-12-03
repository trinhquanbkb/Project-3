import { SuppliersService } from '../services/suppliers.service';
import { CreateSupplierDto } from '../dto/create-supplier.dto';
import { UpdateSupplierDto } from '../dto/update-supplier.dto';
export declare class SuppliersController {
    private readonly suppliersService;
    constructor(suppliersService: SuppliersService);
    create(createSupplierDto: CreateSupplierDto): Promise<import("../schema/supplier.schema").SupplierDocument>;
    findAll(): Promise<import("../schema/supplier.schema").SupplierDocument[]>;
    findOne(id: string): Promise<import("../schema/supplier.schema").SupplierDocument>;
    update(id: string, updateSupplierDto: UpdateSupplierDto): Promise<import("../schema/supplier.schema").SupplierDocument>;
    remove(id: string): string;
}
