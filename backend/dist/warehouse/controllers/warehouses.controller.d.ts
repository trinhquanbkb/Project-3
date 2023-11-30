import { WarehousesService } from '../services/warehouses.service';
import { WarehouseDTO } from '../dto/warehouse.dto';
import { FilterQuery } from 'mongoose';
export declare class WarehousesController {
    private readonly warehouseService;
    constructor(warehouseService: WarehousesService);
    createWarehouse(warehouseDto: WarehouseDTO): Promise<import("../schema/warehouse.schema").WarehouseDocument>;
    findAll(pagination: any, filter: FilterQuery<any>): Promise<{
        data: import("../schema/warehouse.schema").WarehouseDocument[];
        paginations: {
            page: any;
            pageSize: any;
            total: number;
            totalPage: number;
        };
        messenger: string;
    }>;
    findWarehouseById(id: string): Promise<import("../schema/warehouse.schema").WarehouseDocument>;
    updateWarehouse(id: string, warehouseDto: WarehouseDTO): Promise<import("../schema/warehouse.schema").WarehouseDocument>;
    deleteWarehouse(id: string): Promise<import("../schema/warehouse.schema").WarehouseDocument>;
}
