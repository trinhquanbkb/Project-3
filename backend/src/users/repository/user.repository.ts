import { FilterQuery, Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '../schema/user.schema';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';

@Injectable()
export class UsersRepository {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async findOne(filter: any): Promise<UserDocument | null> {
    return this.userModel.findOne(filter);
  }

  async create(createDto: CreateUserDto): Promise<UserDocument> {
    const created = new this.userModel(createDto);
    return await created.save();
  }

  async update(
    id: string,
    updateDto: Partial<UpdateUserDto>,
  ): Promise<UserDocument> {
    return await this.userModel.findByIdAndUpdate(id, updateDto);
  }

  async findAll(
    filter: FilterQuery<any>,
    skip: number,
    limit: number,
  ): Promise<UserDocument[]> {
    const query = {} as Record<string, any>;
    if (filter.username) {
      query.username = { $regex: '.*' + filter.username + '.*' };
    }
    if (filter.email) {
      query.email = { $regex: '.*' + filter.email + '.*' };
    }
    if (filter.role_id) {
      query.role_id = filter.role_id;
    }

    return this.userModel.find(query).skip(skip).limit(limit).exec();
  }
  async delete(_id: string): Promise<UserDocument> {
    return await this.userModel.findByIdAndDelete(_id);
  }
  async countAll(filter: any): Promise<number> {
    return this.userModel.countDocuments(filter).exec();
  }
}
