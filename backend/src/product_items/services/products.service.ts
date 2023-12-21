// roles.service.ts

import { Injectable } from '@nestjs/common';
import { FilterQuery, Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { ProductItemDocument } from '../schema/product.schema';
import { ProductItemDTO } from '../dto/products.dto';

@Injectable()
export class OrdersService {
  constructor(@InjectModel('ProductItem') private roleModel: Model<ProductItemDocument>) {}

  async createRole(roleDto: ProductItemDTO): Promise<ProductItemDocument> {
    const createdRole = new this.roleModel(roleDto);
    return createdRole.save();
  }

  async findAllRoles(pagination: any, filter: any){
    const {  page, pageSize } = pagination;
    const skip = (page - 1) * pageSize;
    const data = await this.roleModel.find(filter).skip(skip).limit(parseInt(pageSize, 10)).exec();;
    const total = await this.roleModel.countDocuments(filter).exec();
    const paginations = {
      "page": page,
      "pageSize": pageSize,
      "total": total,
      "totalPage": Math.ceil(total / pageSize)
    }
    return { data, paginations, messenger: "succes" };
  }

  async findRoleById(id: string): Promise<ProductItemDocument | null> {
    return this.roleModel.findById(id).exec();
  }

  async findProductItemsByWarehouseId(warehouseId: string) {
    return this.roleModel.find({ warehouse_id: warehouseId }).exec();
  }

  async updateRole(id: string, roleDto: ProductItemDTO): Promise<ProductItemDocument | null> {
    return this.roleModel.findByIdAndUpdate(id, roleDto, { new: true }).exec();
  }

  async deleteRole(id: string): Promise<ProductItemDocument | null> {
    return this.roleModel.findByIdAndRemove(id).exec();
  }
}
