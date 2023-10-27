import { FilterQuery, Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';
import { Product, ProductDocument } from '../schema/product.schema';

@Injectable()
export class ProductsRepository {
  constructor(@InjectModel(Product.name) private productModel: Model<ProductDocument>) { }

  async findOne(filter: FilterQuery<any>): Promise<ProductDocument | null> {
    return this.productModel.findOne(filter);
  }

  async create(createDto: CreateProductDto): Promise<ProductDocument> {
    const created = new this.productModel(createDto);
    return await created.save();
  }

  async update(
    id: string,
    updateDto: Partial<UpdateProductDto>,
  ): Promise<ProductDocument> {
    return await this.productModel.findByIdAndUpdate(id, updateDto);
  }

  async findAll(filter?: FilterQuery<any>): Promise<ProductDocument[]> {
    return this.productModel.find(filter).sort({ createdAt: -1 }).exec();
  }

  async delete(_id: string): Promise<ProductDocument> {
    return await this.productModel.findByIdAndDelete(_id);
  }

  async deleteMany(filter?: FilterQuery<any>): Promise<any> {
    return await this.productModel.deleteMany(filter);
  }
}
