import { Injectable } from '@nestjs/common';
import { FilterQuery } from 'mongoose';
import { CreateSupplierDto } from '../dto/create-supplier.dto';
import { UpdateSupplierDto } from '../dto/update-supplier.dto';
import { SuppliersRepository } from '../repository/supplier.repository';

@Injectable()
export class SuppliersService {
  constructor(private readonly suppliersRepository: SuppliersRepository) {}
  async create(createSupplierDto: CreateSupplierDto) {
    return await this.suppliersRepository.create(createSupplierDto);
  }

  async findAll() {
    return await this.suppliersRepository.findAll();
  }

  async findOne(filter: FilterQuery<any>) {
    return await this.suppliersRepository.findOne(filter);
  }

  async update(id: string, updateSupplierDto: UpdateSupplierDto) {
    return await this.suppliersRepository.update(id, updateSupplierDto);
  }

  remove(id: number) {
    return `This action removes a #${id} supplier`;
  }
}
