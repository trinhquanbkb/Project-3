// roles.service.ts

import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { FinancialTransactionsDocument } from '../schema/financial-transaction.schema';
import { CreateFinancialTransactionDto } from '../dto/create-financial-transaction.dto';
import { ProductDocument } from 'src/products/schema/product.schema';
import { ProductItemDocument } from 'src/product_items/schema/product.schema';


@Injectable()
export class FinancialTransactionService {
  constructor(
    @InjectModel('FinancialTransaction') private roleModel: Model<FinancialTransactionsDocument>,
    @InjectModel('Product') private productModel: Model<ProductDocument>,
    @InjectModel('ProductItem') private productItemModel: Model<ProductItemDocument>
  ) { }

  async create(roleDto: CreateFinancialTransactionDto): Promise<FinancialTransactionsDocument> {
    const createdRole = new this.roleModel(roleDto);
    const products = [...roleDto.products];
    const promises = products.map(async (element) => {
      const newProductItem = new this.productItemModel({
        expriry_data: "20/11/2023",
        quantity: Number(element.quantity),
        price: Number(element.price),
        warehouse_id: '' + roleDto.warehouseId,
        supplier_id: '' + roleDto.supplierId,
      });
      const productItem = await newProductItem.save()
      const product = await this.productModel.findOne({ product_name: element.name });
      if (product?._id) {
        const { category,products_items_item, quantity } = product
        await this.productModel.findByIdAndUpdate(product._id, {
          category: [...category, element.category],
          quantity: quantity + Number(element.quantity),
          products_items_item: [...products_items_item, productItem._id.toString()],
        })
      } else {
        let d = new this.productModel({
          "product_name": element.name,
          "quantity": element.quantity,
          "category": [
            element.category
          ],
          "url": "https://png.pngtree.com/png-vector/20190701/ourlarge/pngtree-package-icon-for-your-project-png-image_1533313.jpg",
          "products_items_item": [productItem._id.toString()]
        });

        d.save()
      }
    })
    await Promise.all(promises);
    return createdRole.save();
  }

  async findAll(pagination: any, filter: any) {
    const { page, pageSize } = pagination;
    const skip = (page - 1) * pageSize;
    const data = await this.roleModel.find(filter).sort({ createdAt: -1 }).skip(skip).limit(parseInt(pageSize, 10)).exec();;
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
