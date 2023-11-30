import { FilterQuery, Model } from 'mongoose';
import { WarehouseDocument } from '../schema/warehouse.schema';
import { WarehouseDTO } from '../dto/warehouse.dto';
export declare class WarehousesService {
    private warehouseModel;
    constructor(warehouseModel: Model<WarehouseDocument>);
    createWarehouse(warehouseDto: WarehouseDTO): Promise<WarehouseDocument>;
    findAllWarehouse(pagination: any, filter: FilterQuery<any>): Promise<{
        data: WarehouseDocument[];
        paginations: {
            page: any;
            pageSize: any;
            total: number;
            totalPage: number;
        };
        messenger: string;
    }>;
    findWarehouseById(id: string): Promise<WarehouseDocument | null>;
    updateWarehouse(id: string, warehouseDto: WarehouseDTO): Promise<WarehouseDocument | null>;
    deleteWarehouse(id: string): Promise<WarehouseDocument | null>;
}
