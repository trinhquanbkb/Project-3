// roles.service.ts

import { Injectable } from '@nestjs/common';
import mongoose, { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { ReportDocument } from '../schema/report.schema';
import { ReportsDTO } from '../dto/products.dto';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class ReportsService {
  constructor(
    @InjectModel('Report') private reportModel: Model<ReportDocument>,
  ) {}

  async createReport(req: any, reportDto: ReportsDTO): Promise<ReportDocument> {
    const token = req.headers.authorization.replace('Bearer ', '');
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const dataCreate = {
      product_id: reportDto.product_id,
      note: reportDto.note,
      warehouse_id: decodedToken['warehouse_id']._id,
      user_id: decodedToken['_id'],
    };
    const createdReport = new this.reportModel(dataCreate);
    return createdReport.save();
  }

  async findAllReports(req: any, pagination: any, filter: any) {
    const { page, pageSize } = pagination;
    const skip = (page - 1) * pageSize;
    const token = req.headers.authorization.replace('Bearer ', '');
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const warehouseId = decodedToken['warehouse_id']._id;

    const data = await this.reportModel
      .find({ warehouse_id: warehouseId })
      .skip(skip)
      .limit(parseInt(pageSize, 10))
      .populate([
        {
          path: 'product_id',
          model: 'Product',
        },
        {
          path: 'warehouse_id',
          model: 'Warehouse',
        },
        {
          path: 'user_id',
          model: 'User',
          populate: [
            {
              path: 'role_id',
              model: 'Role',
            },
          ],
        },
      ])
      .exec();
    const total = await this.reportModel.countDocuments(filter).exec();

    const paginations = {
      page: page,
      pageSize: pageSize,
      total: total,
      totalPage: Math.ceil(total / pageSize),
    };
    return { data: data, paginations, messenger: 'success' };
  }

  async findRoleById(request: any, id: string): Promise<any> {
    const token = request.headers.authorization.replace('Bearer ', '');
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const warehouseId = decodedToken['warehouse_id']._id;

    const result = await this.reportModel
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
    let data = this.reportModel.find(filter);
    return data;
  }

  async updateRole(
    id: string,
    roleDto: ReportsDTO,
  ): Promise<ReportDocument | null> {
    return this.reportModel
      .findByIdAndUpdate(id, roleDto, { new: true })
      .exec();
  }

  async search(inputString: string) {
    const regex = new RegExp(inputString, 'i');
    return await this.reportModel
      .find({ product_name: { $regex: regex } })
      .exec();
  }

  async deleteRole(id: string): Promise<ReportDocument | null> {
    return this.reportModel.findByIdAndRemove(id).exec();
  }

  async getExcelFile() {
    const data = await this.reportModel
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
