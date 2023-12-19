// roles.service.ts

import { Injectable } from '@nestjs/common';
import { FilterQuery, Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { OrderDocument } from '../schema/order.schema';
import { OrdersDTO } from '../dto/orders.dto';
import { ProductItemDocument } from 'src/product_items/schema/product.schema';

@Injectable()
export class OrdersService {
  constructor(@InjectModel('Order') private roleModel: Model<OrderDocument>, @InjectModel('ProductItem') private productItemModel: Model<ProductItemDocument>) { }

  async createRole(roleDto: OrdersDTO): Promise<OrderDocument> {
    const product_items = []
    roleDto.products.forEach(product => product.product_item.forEach(product_item => product_items.push({ id: product_item.product_item_id, quantity: product_item.quantity })))
    const updateOperations = product_items.map(update => ({
      updateOne: {
        filter: { _id: update.id },
        update: { $inc: { quantity: -update.quantity, quantity_sold: +update.quantity} },
      },
    }));
    this.productItemModel.bulkWrite(updateOperations)
      .then(result => {
        console.log(result);
      })
      .catch(error => {
        console.error(error);
      });
    const createdRole = new this.roleModel(roleDto);
    return createdRole.save();
  }

  async findAllRoles(pagination: any, filter: any) {
    const { page, pageSize } = pagination;
    const skip = (page - 1) * pageSize;
    const data = await this.roleModel.find(filter).skip(skip).limit(parseInt(pageSize, 10))
    .populate([
      {
        path: 'products.product_id', 
        model: 'Product',
        select: 'product_name category url'
      },
      {
        path: 'products.product_item.product_item_id', 
        model: 'ProductItem',
        populate:[
          {
            path: 'warehouse_id',
            model: 'Warehouse', 
          },
          {
            path: 'supplier_id',
            model: 'Supplier', 
          },
        ] 
      }
    ])
    .exec();
    const total = await this.roleModel.countDocuments(filter).exec();
    const paginations = {
      "page": page,
      "pageSize": pageSize,
      "total": total,
      "totalPage": Math.ceil(total / pageSize)
    }
    return { data, paginations, messenger: "succes" };
  }

  async findRoleById(id: string): Promise<OrderDocument | null> {
    return this.roleModel.findById(id).exec();
  }

  async update(id: string, roleDto: any): Promise<OrderDocument | null> {
    return this.roleModel.findByIdAndUpdate(id, roleDto, { new: true }).exec();
  }

  async deleteRole(id: string): Promise<OrderDocument | null> {
    return this.roleModel.findByIdAndRemove(id).exec();
  }
}
