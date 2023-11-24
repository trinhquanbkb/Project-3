import { FilterQuery } from 'mongoose';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UsersRepository } from '../repository/user.repository';
export declare class UsersService {
    private readonly usersRepository;
    constructor(usersRepository: UsersRepository);
    create(createUserDto: CreateUserDto): Promise<import("../schema/user.schema").UserDocument>;
    findAll(pagination: any, filter: FilterQuery<any>): Promise<{
        data: import("../schema/user.schema").UserDocument[];
        paginations: {
            page: any;
            pageSize: any;
            total: number;
            totalPage: number;
        };
        messenger: string;
    }>;
    findOne(filter: FilterQuery<any>): Promise<import("../schema/user.schema").UserDocument>;
    update(id: string, updateUserDto: UpdateUserDto): Promise<import("../schema/user.schema").UserDocument>;
    remove(id: number): string;
}
