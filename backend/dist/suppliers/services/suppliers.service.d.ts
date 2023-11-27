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
