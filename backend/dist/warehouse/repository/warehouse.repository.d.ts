import { FilterQuery, Model } from 'mongoose';
import { WarehouseDocument } from '../schema/warehouse.schema';
export declare class WarehousesRepository {
    private warehouseModel;
    constructor(warehouseModel: Model<WarehouseDocument>);
    findAll(filter: FilterQuery<any>, skip: number, limit: number): Promise<WarehouseDocument[]>;
    countAll(filter: FilterQuery<any>): Promise<number>;
}
