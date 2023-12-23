// roles.service.ts

import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { FinancialTransactionsDocument } from '../schema/financial-transaction.schema';
import { CreateFinancialTransactionDto } from '../dto/create-financial-transaction.dto';
import { ProductDocument } from 'src/products/schema/product.schema';
import { ProductItemDocument } from 'src/product_items/schema/product.schema';
import path from 'path';
import { UpdateFinancialTransactionDto } from '../dto/update-financial-transaction.dto';

@Injectable()
export class FinancialTransactionService {
  constructor(
    @InjectModel('FinancialTransaction')
    private roleModel: Model<FinancialTransactionsDocument>,
    @InjectModel('Product') private productModel: Model<ProductDocument>,
    @InjectModel('ProductItem')
    private productItemModel: Model<ProductItemDocument>,
  ) {}

  async create(
    roleDto: CreateFinancialTransactionDto,
  ): Promise<FinancialTransactionsDocument> {
    const productItems = await this.productItemModel.insertMany(
      roleDto.products.map((product) => ({
        expriry_data: product.expriry_data,
        quantity: product.quantity,
        price: product.price,
        warehouse_id: roleDto.warehouseId,
        supplier_id: roleDto.supplierId,
        product_id: product.product_id,
        weight: product.weight,
        quantity_sold: 0,
        hide: true,
      })),
    );
    const createdRole = new this.roleModel({
      ...roleDto,
      products: productItems.map((productItem) => productItem._id.toString()),
    });
    return createdRole.save();
  }

  async findAll(pagination: any, filter: any) {
    const { page, pageSize } = pagination;
    const skip = (page - 1) * pageSize;
    let filterData = {};
    if (filter.code !== '') {
      filterData['_id'] = filter.code;
    } else {
      filterData = {};
    }

    const data = await this.roleModel
      .find(filterData)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(pageSize, 10))
      .populate([
        {
          path: 'warehouseId', // Tên trường trong schema FinancialTransaction
          model: 'Warehouse', // Tên collection
        },
        {
          path: 'supplierId', // Tên trường trong schema FinancialTransaction
          model: 'Supplier', // Tên collection
        },
        {
          path: 'products',
          model: 'ProductItem',
        },
      ])
      .exec();
    const total = await this.roleModel.countDocuments(filterData).exec();
    const paginations = {
      page: page,
      pageSize: pageSize,
      total: total,
      totalPage: Math.ceil(total / pageSize),
    };

    return { data, paginations, messenger: 'success' };
  }

  async findOne(id: string): Promise<FinancialTransactionsDocument | null> {
    return this.roleModel
      .findById(id)
      .populate([
        {
          path: 'warehouseId', // Tên trường trong schema FinancialTransaction
          model: 'Warehouse', // Tên collection
        },
        {
          path: 'supplierId', // Tên trường trong schema FinancialTransaction
          model: 'Supplier', // Tên collection
        },
        {
          path: 'products',
          model: 'ProductItem',
          populate: {
            path: 'product_id', // Tên trường trong schema Product
            model: 'Product', // Tên collection
          },
        },
      ])
      .exec();
  }

  async update(
    id: string,
    roleDto: any,
  ): Promise<FinancialTransactionsDocument | null> {
    if (roleDto.status == 'Thành công') {
      const data = await this.roleModel.findById(id);
      if (data) {
        this.productItemModel.updateMany(
          { _id: { $in: data.products } }, // Chọn các bản ghi dựa trên mảng các id
          { $set: { hide: false } }
        ).exec()

      }
    }
    return this.roleModel.findByIdAndUpdate(id, roleDto, { new: true }).exec();
  }

  async remove(id: string): Promise<FinancialTransactionsDocument | null> {
    return this.roleModel.findByIdAndRemove(id).exec();
  }
}
