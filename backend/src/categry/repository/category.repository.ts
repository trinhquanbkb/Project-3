import { FilterQuery, Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreatecategoryDto } from '../dto/create-category.dto';
import { UpdatecategoryDto } from '../dto/update-category.dto';
import { category, categoryDocument } from '../schema/category.schema';

@Injectable()
export class CategoryRepository {
  constructor(@InjectModel(category.name) private CategoryModel: Model<categoryDocument>) { }

  async findOne(filter: FilterQuery<any>): Promise<categoryDocument | null> {
    return this.CategoryModel.findOne(filter);
  }

  async create(createDto: CreatecategoryDto): Promise<categoryDocument> {
    const created = new this.CategoryModel(createDto);
    return await created.save();
  }

  async update(
    id: string,
    updateDto: Partial<UpdatecategoryDto>,
  ): Promise<categoryDocument> {
    return this.CategoryModel.findByIdAndUpdate(id, updateDto, { new: true });
  }

  async findAll(filter?: FilterQuery<any>): Promise<categoryDocument[]> {
    return this.CategoryModel.find(filter);
  }

  async delete(_id: string): Promise<categoryDocument | null> {
    return await this.CategoryModel.findByIdAndDelete(_id);
  }
}
