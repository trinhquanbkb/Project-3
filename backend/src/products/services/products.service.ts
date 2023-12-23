// roles.service.ts

import { Injectable } from '@nestjs/common';
import mongoose, { FilterQuery, Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { ProductDocument } from '../schema/product.schema';
import { ProductsDTO } from '../dto/products.dto';

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel('Product') private productModel: Model<ProductDocument>,
  ) {}

  async createRole(roleDto: ProductsDTO): Promise<ProductDocument> {
    const createdRole = new this.productModel(roleDto);
    return createdRole.save();
  }

  async findAllRoles(pagination: any, filter: any) {
    const { page, pageSize } = pagination;
    const skip = (page - 1) * pageSize;
    const data = await this.productModel
      .aggregate([
        {
          $match: filter, // Điều kiện lọc nếu cần
        },
        {
          $skip: skip,
        },
        {
          $limit: parseInt(pageSize, 10),
        },
        {
          $lookup: {
            from: 'productitems', // Tên của collection ProductItem
            let: { productId: '$_id' },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $eq: ['$product_id', { $toString: '$$productId' }],
                  },
                },
              },
            ],
            as: 'product_items',
          },
        },
      ])
      .exec();
    const total = await this.productModel.countDocuments(filter).exec();
    const results = data.map((item) => {
      let quantityPr = 0;
      item.product_items.forEach((i) => {
        quantityPr += i.quantity;
      });
      return { ...item, quantity: quantityPr };
    });
    const paginations = {
      page: page,
      pageSize: pageSize,
      total: total,
      totalPage: Math.ceil(total / pageSize),
    };
    return { data: results, paginations, messenger: 'succes' };
  }

  async findRoleById(id: string): Promise<any> {
    const result = await this.productModel
      .aggregate([
        {
          $match: {
            _id: new mongoose.Types.ObjectId(id),
          },
        },
        {
          $lookup: {
            from: 'productitems',
            let: { productId: '$_id' },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $eq: ['$product_id', { $toString: '$$productId' }],
                  },
                },
              },
            ],
            as: 'product_items',
          },
        },
      ])
      .exec();
    let quantity = 0;
    if (result.length === 0) {
      return {};
    } else {
      result[0].product_items.forEach((item) => (quantity += item.quantity));
      return { ...result[0], quantity: quantity };
    }
  }

  async findOne(filter: any) {
    let data = this.productModel.find(filter);
    return data;
  }

  async updateRole(
    id: string,
    roleDto: ProductsDTO,
  ): Promise<ProductDocument | null> {
    return this.productModel
      .findByIdAndUpdate(id, roleDto, { new: true })
      .exec();
  }

  async search(inputString: string) {
    const regex = new RegExp(inputString, 'i');
    return await this.productModel
      .find({ product_name: { $regex: regex } })
      .exec();
  }

  async deleteRole(id: string): Promise<ProductDocument | null> {
    return this.productModel.findByIdAndRemove(id).exec();
  }
}
