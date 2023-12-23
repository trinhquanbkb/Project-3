import { Injectable } from '@nestjs/common';
import { FilterQuery } from 'mongoose';
import { CreatecategoryDto } from '../dto/create-category.dto';
import { UpdatecategoryDto } from '../dto/update-category.dto';
import { CategoryRepository } from '../repository/category.repository';

@Injectable()
export class CategoryService { // Đổi tên service thành 'CategoryService'
  constructor(private readonly categoryRepository: CategoryRepository) {} // Đổi tên repository thành 'CategoryRepository'

  async create(createcategoryDto: CreatecategoryDto) {
    return await this.categoryRepository.create(createcategoryDto);
  }

  async findAll() {
    return await this.categoryRepository.findAll();
  }

  async findOne(filter: FilterQuery<any>) {
    return await this.categoryRepository.findOne(filter);
  }

  async update(id: string, updatecategoryDto: UpdatecategoryDto) {
    return await this.categoryRepository.update(id, updatecategoryDto);
  }

  remove(id: number) {
    return `This action removes a #${id} category`;
  }
}
