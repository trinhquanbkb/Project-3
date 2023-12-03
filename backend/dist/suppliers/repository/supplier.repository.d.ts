import { FilterQuery, Model } from 'mongoose';
import { CreateSupplierDto } from '../dto/create-supplier.dto';
import { UpdateSupplierDto } from '../dto/update-supplier.dto';
import { SupplierDocument } from '../schema/supplier.schema';
export declare class SuppliersRepository {
    private supplierModel;
    constructor(supplierModel: Model<SupplierDocument>);
    findOne(filter: FilterQuery<any>): Promise<SupplierDocument | null>;
    create(createDto: CreateSupplierDto): Promise<SupplierDocument>;
    update(id: string, updateDto: Partial<UpdateSupplierDto>): Promise<SupplierDocument>;
    findAll(filter?: FilterQuery<any>): Promise<SupplierDocument[]>;
    delete(_id: string): Promise<SupplierDocument | null>;
}
