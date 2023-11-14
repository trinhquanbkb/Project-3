import { FilterQuery, Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateSupplierDto } from '../dto/create-supplier.dto';
import { UpdateSupplierDto } from '../dto/update-supplier.dto';
import { Supplier, SupplierDocument } from '../schema/supplier.schema';

@Injectable()
export class SuppliersRepository {
  constructor(@InjectModel(Supplier.name) private supplierModel: Model<SupplierDocument>) { }

  async findOne(filter: FilterQuery<any>): Promise<SupplierDocument | null> {
    return this.supplierModel.findOne(filter);
  }

  async create(createDto: CreateSupplierDto): Promise<SupplierDocument> {
    const created = new this.supplierModel(createDto);
    return await created.save();
  }

  async update(
    id: string,
    updateDto: Partial<UpdateSupplierDto>,
  ): Promise<SupplierDocument> {
    return this.supplierModel.findByIdAndUpdate(id, updateDto, { new: true });
  }

  async findAll(filter?: FilterQuery<any>): Promise<SupplierDocument[]> {
    return this.supplierModel.find(filter);
  }

  async delete(_id: string): Promise<SupplierDocument | null> {
    return await this.supplierModel.findByIdAndDelete(_id);
  }
}
