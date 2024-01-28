import { Injectable } from '@nestjs/common';
import { FilterQuery } from 'mongoose';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UsersRepository } from '../repository/user.repository';
import { configs } from 'src/config/configuration';
import { hashSync } from 'bcrypt';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}
  async create(createUserDto: CreateUserDto) {
    createUserDto.password = hashSync(
      createUserDto.password,
      configs.saltOrRound,
    );
    return await this.usersRepository.create(createUserDto);
  }

  async findAll(req, pagination: any, filter: any) {
    const { page, pageSize } = pagination;
    const skip = (page - 1) * pageSize;

    const token = req.headers.authorization.replace('Bearer ', '');
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    let warehouseId;
    if (decodedToken['role_id'].name === 'Admin') {
      warehouseId = null;
    } else {
      warehouseId = decodedToken['warehouse_id']._id;
    }

    let filterData = {};
    if (filter.username !== '') {
      filterData['username'] = filter.username;
    }
    if (filter.role_id !== '') {
      filterData['role_id'] = filter.role_id;
    }
    if (filter.email !== '') {
      filterData['email'] = filter.email;
    }
    if (warehouseId) {
      filterData['warehouse_id'] = warehouseId;
    } else {
      delete filterData['warehouse_id'];
    }

    const data = await this.usersRepository.findAll(
      filterData,
      skip,
      parseInt(pageSize, 10),
    );
    const total = await this.usersRepository.countAll(filterData);
    const paginations = {
      page: page,
      pageSize: pageSize,
      total: total,
      totalPage: Math.ceil(total / pageSize) || 0,
    };
    return { data, paginations, messenger: 'success' };
  }

  async findOne(filter: FilterQuery<any>) {
    return await this.usersRepository.findOne(filter);
  }

  async findUserLogged(filter: FilterQuery<any>) {
    return await this.usersRepository.findOne(filter);
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    return await this.usersRepository.update(id, updateUserDto);
  }

  async remove(id: string) {
    const removeUser = await this.usersRepository.delete(id);
    if (removeUser) {
      return removeUser;
    } else {
      return {
        error: 'error delete user',
      };
    }
  }
}
