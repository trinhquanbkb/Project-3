import { Injectable } from '@nestjs/common';
import { FilterQuery } from 'mongoose';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UsersRepository } from '../repository/user.repository';
import { configs } from 'src/config/configuration';
import { hashSync } from 'bcrypt';

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

  async findAll(pagination: any, filter: any) {
    const { page, pageSize } = pagination;
    const skip = (page - 1) * pageSize;

    // let filterData = {};
    // if (filter.username !== '') {
    //   filterData['username'] = filter.username;
    // }
    // if (filter.role_id !== '') {
    //   filterData['role_id'] = filter.role_id;
    // }
    // if (filter.email !== '') {
    //   filterData['email'] = filter.email;
    // }

    const data = await this.usersRepository.findAll(
      filter,
      skip,
      parseInt(pageSize, 10),
    );
    const total = await this.usersRepository.countAll(filter);
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
