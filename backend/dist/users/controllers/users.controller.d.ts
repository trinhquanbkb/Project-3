import { UsersService } from '../services/users.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    create(createUserDto: CreateUserDto): Promise<import("../schema/user.schema").UserDocument>;
    findAll(): Promise<import("../schema/user.schema").UserDocument[]>;
    findOne(id: string): Promise<import("../schema/user.schema").UserDocument>;
    update(id: string, updateUserDto: UpdateUserDto): Promise<import("../schema/user.schema").UserDocument>;
    remove(id: string): string;
}
