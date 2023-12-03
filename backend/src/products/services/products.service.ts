// roles.service.ts

import { Injectable } from '@nestjs/common';
import { FilterQuery, Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { ProductDocument } from '../schema/product.schema';
import { ProductsDTO } from '../dto/products.dto';

@Injectable()
export class OrdersService {
  constructor(@InjectModel('Product') private roleModel: Model<ProductDocument>) {}

  async createRole(roleDto: ProductsDTO): Promise<ProductDocument> {
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

  async findRoleById(id: string): Promise<ProductDocument | null> {
    return this.roleModel.findById(id).exec();
  }

  async findOne(filter:any) {
    let data =this.roleModel.find(filter)
    console.log(data)
    return data
  }

  async updateRole(id: string, roleDto: ProductsDTO): Promise<ProductDocument | null> {
    return this.roleModel.findByIdAndUpdate(id, roleDto, { new: true }).exec();
  }

  async deleteRole(id: string): Promise<ProductDocument | null> {
    return this.roleModel.findByIdAndRemove(id).exec();
  }
}
