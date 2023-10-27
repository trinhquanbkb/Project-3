import { Injectable } from '@nestjs/common';
import { FilterQuery } from 'mongoose';
import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';
import { ProductsRepository } from '../repository/product.repository';

@Injectable()
export class ProductsService {
  constructor(private readonly productsRepository: ProductsRepository) {}
  async create(createUserDto: CreateProductDto) {
    return await this.productsRepository.create(createUserDto);
  }

  async findAll(filter?: FilterQuery<any>) {
    return await this.productsRepository.findAll(filter);
  }

  async findOne(filter: FilterQuery<any>) {
    return await this.productsRepository.findOne(filter);
  }

  async update(id: string, updateUserDto: UpdateProductDto) {
    return await this.productsRepository.update(id, updateUserDto);
  }

  async remove(id: string) {
    return await this.productsRepository.delete(id);
  }

  async removeAll(filter: FilterQuery<any>) {
    return await this.productsRepository.deleteMany(filter);
  }
}
