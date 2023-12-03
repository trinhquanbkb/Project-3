import { Injectable } from '@nestjs/common';
import { FilterQuery, Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { WarehouseDocument } from '../schema/warehouse.schema';
import { WarehouseDTO } from '../dto/warehouse.dto';

@Injectable()
export class WarehousesService {
  constructor(
    @InjectModel('Warehouse') private warehouseModel: Model<WarehouseDocument>,
  ) {}

  async createWarehouse(
    warehouseDto: WarehouseDTO,
  ): Promise<WarehouseDocument> {
    const createdWarehouse = new this.warehouseModel(warehouseDto);
    return createdWarehouse.save();
  }

  async findAllRoles(pagination: any, filter: any){
    const {  page, pageSize } = pagination;
    const skip = (page - 1) * pageSize;
    const data = await this.warehouseModel
      .find(filter)
      .skip(skip)
      .limit(parseInt(pageSize, 10))
      .exec();
    const total = await this.warehouseModel.countDocuments(filter).exec();
    const paginations = {
      page: page,
      pageSize: pageSize,
      total: total,
      totalPage: Math.ceil(total / pageSize),
    };
    return { data, paginations, messenger: 'succes' };
  }

  async findWarehouseById(id: string): Promise<WarehouseDocument | null> {
    return this.warehouseModel.findById(id).exec();
  }

  async updateWarehouse(
    id: string,
    warehouseDto: WarehouseDTO,
  ): Promise<WarehouseDocument | null> {
    return this.warehouseModel
      .findByIdAndUpdate(id, warehouseDto, { new: true })
      .exec();
  }

  async deleteWarehouse(id: string): Promise<WarehouseDocument | null> {
    return this.warehouseModel.findByIdAndRemove(id).exec();
  }
}
