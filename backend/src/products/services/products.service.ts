// roles.service.ts

import { Injectable, BadRequestException } from '@nestjs/common';
import mongoose, { FilterQuery, Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { ProductDocument } from '../schema/product.schema';
import { ProductsDTO } from '../dto/products.dto';
import { ObjectId } from 'mongodb';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel('Product') private productModel: Model<ProductDocument>,
  ) {}

  async createRole(roleDto: ProductsDTO): Promise<ProductDocument> {
    const createdRole = new this.productModel(roleDto);
    return createdRole.save();
  }

  async findAllRoles(req: any, pagination: any, filter: any) {
    const { page, pageSize } = pagination;
    const skip = (page - 1) * pageSize;
    let filterData = {};
    if (filter.code) {
      filterData['_id'] = new ObjectId(filter.code);
    } else {
      delete filterData['_id'];
      filterData = { ...filterData };
    }
    if (filter.name) {
      filterData['product_name'] = filter.name;
    } else {
      delete filterData['product_name'];
      filterData = { ...filterData };
    }

    const token = req.headers.authorization.replace('Bearer ', '');
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const warehouseId = decodedToken['warehouse_id']._id;

    const data = await this.productModel
      .aggregate([
        {
          $match: filterData, // Điều kiện lọc nếu cần
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
                    $and: [
                      { $eq: ['$product_id', { $toString: '$$productId' }] },
                      { $eq: ['$warehouse_id', warehouseId] },
                    ],
                  },
                },
              },
              {
                $lookup: {
                  from: 'suppliers',
                  let: {
                    supplierId: {
                      $convert: { input: '$supplier_id', to: 'objectId' },
                    },
                  },
                  pipeline: [
                    {
                      $match: {
                        $expr: { $eq: ['$_id', '$$supplierId'] },
                      },
                    },
                  ],
                  as: 'supplier_id',
                },
              },
              {
                $lookup: {
                  from: 'warehouses',
                  let: {
                    warehouseId: {
                      $convert: { input: '$warehouse_id', to: 'objectId' },
                    },
                  },
                  pipeline: [
                    {
                      $match: {
                        $expr: { $eq: ['$_id', '$$warehouseId'] },
                      },
                    },
                  ],
                  as: 'warehouse_id',
                },
              },
            ],
            as: 'product_items',
          },
        },
      ])
      .exec();
    const total = await this.productModel.countDocuments(filterData).exec();

    const results = data.map((item) => {
      let quantityPr = 0;
      let quantitySold = 0;
      let totalWeight = 0;
      let warehouse_id;
      let supplier_id;
      item.product_items.forEach((i) => {
        quantityPr += i.quantity;
        quantitySold += i.quantity_sold;
        totalWeight += i.quantity * i.weight;
        warehouse_id = i.warehouse_id[0];
        supplier_id = i.supplier_id[0];
      });
      return {
        ...item,
        quantity: quantityPr,
        quantitySold: quantitySold,
        totalWeight,
        warehouse_id: warehouse_id,
        supplier_id: supplier_id,
      };
    });
    const paginations = {
      page: page,
      pageSize: pageSize,
      total: total,
      totalPage: Math.ceil(total / pageSize),
    };
    return { data: results, paginations, messenger: 'succes' };
  }

  async findRoleById(request: any, id: string): Promise<any> {
    const token = request.headers.authorization.replace('Bearer ', '');
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const warehouseId = decodedToken['warehouse_id']._id;

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
                  $expr: { $eq: ['$product_id', { $toString: '$$productId' }] },
                },
              },
              {
                $lookup: {
                  from: 'suppliers',
                  let: {
                    supplierId: {
                      $convert: { input: '$supplier_id', to: 'objectId' },
                    },
                  },
                  pipeline: [
                    {
                      $match: {
                        $expr: { $eq: ['$_id', '$$supplierId'] },
                      },
                    },
                  ],
                  as: 'supplier_id',
                },
              },
              {
                $lookup: {
                  from: 'warehouses',
                  let: {
                    warehouseId: {
                      $convert: { input: '$warehouse_id', to: 'objectId' },
                    },
                  },
                  pipeline: [
                    {
                      $match: {
                        $expr: {
                          $eq: ['$_id', '$$warehouseId'],
                        },
                      },
                    },
                  ],
                  as: 'warehouse_id',
                },
              },
            ],
            as: 'product_items',
          },
        },
      ])
      .exec();
    let quantity = 0;
    let quantity_sold = 0;
    let warehouse_id;
    let supplier_id;
    if (result.length === 0) {
      return {};
    } else {
      result[0].product_items.forEach((item) => {
        if (
          item.warehouse_id.length !== 0 &&
          item.warehouse_id[0]._id.toString() === warehouseId
        ) {
          quantity += item.quantity;
          quantity_sold += item.quantity_sold;
          warehouse_id = item.warehouse_id[0];
          supplier_id = item.supplier_id[0];
        }
      });
      const product_items = result[0].product_items.filter(
        (item) => item.warehouse_id[0]._id.toString() === warehouseId,
      );
      return {
        ...result[0],
        product_items: product_items,
        quantity_sold: quantity_sold,
        quantity: quantity,
        supplier: supplier_id,
        warehouse: warehouse_id,
      };
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

  async getExcelFile() {
    const data = await this.productModel
      .aggregate([
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

    let arrExcel: any[] = [];
    data.forEach((item) => {
      item.product_items.forEach((i) => {
        arrExcel.push({
          id: i._id.toString(),
          expriryData: i.expriry_data,
          productName: item.product_name,
          quantity: i.quantity,
          url: item.url,
          weight: i.weight,
          price: i.price,
          quantitySold: i.quantity_sold,
          hide: i.hide ? 'Chưa duyệt' : 'Đã duyệt',
          createdAt: i.createdAt,
        });
      });
    });
    return arrExcel;
  }
}
