// roles.service.ts

import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { FinancialTransactionsDocument } from '../schema/financial-transaction.schema';
import { CreateFinancialTransactionDto } from '../dto/create-financial-transaction.dto';
import { ProductDocument } from 'src/products/schema/product.schema';
import { ProductItemDocument } from 'src/product_items/schema/product.schema';
import path from 'path';


@Injectable()
export class FinancialTransactionService {
  constructor(
    @InjectModel('FinancialTransaction') private roleModel: Model<FinancialTransactionsDocument>,
    @InjectModel('Product') private productModel: Model<ProductDocument>,
    @InjectModel('ProductItem') private productItemModel: Model<ProductItemDocument>
  ) { }

  async create(roleDto: CreateFinancialTransactionDto): Promise<FinancialTransactionsDocument> {
    const createdRole = new this.roleModel(roleDto);
    return createdRole.save();
  }

  async findAll(pagination: any, filter: any) {
    const { page, pageSize } = pagination;
    const skip = (page - 1) * pageSize;
    const data = await this.roleModel.find(filter).sort({ createdAt: -1 }).skip(skip).limit(parseInt(pageSize, 10))
    .populate([
      {
        path: 'warehouseId', // Tên trường trong schema FinancialTransaction
        model: 'Warehouse', // Tên collection
      },
      {
        path: 'supplierId', // Tên trường trong schema FinancialTransaction
        model: 'Supplier', // Tên collection
      },
    ])
    .exec()
    const total = await this.roleModel.countDocuments(filter).exec();
    const paginations = {
      "page": page,
      "pageSize": pageSize,
      "total": total,
      "totalPage": Math.ceil(total / pageSize)
    }

    return { data, paginations, messenger: "succes" };
  }

  async findOne(id: string): Promise<FinancialTransactionsDocument | null> {
    return this.roleModel.findById(id).exec();
  }

  async update(id: string, roleDto: CreateFinancialTransactionDto): Promise<FinancialTransactionsDocument | null> {
    return this.roleModel.findByIdAndUpdate(id, roleDto, { new: true }).exec();
  }

  async remove(id: string): Promise<FinancialTransactionsDocument | null> {
    return this.roleModel.findByIdAndRemove(id).exec();
  }
}
