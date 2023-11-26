import { UsersService } from '../services/users.service';
import { UpdateUserDto } from '../dto/update-user.dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    findAll(pagination: any, filter: string): Promise<{
        data: import("../schema/user.schema").UserDocument[];
        paginations: {
            page: any;
            pageSize: any;
            total: number;
            totalPage: number;
        };
        messenger: string;
    }>;
    findOne(id: string): Promise<import("../schema/user.schema").UserDocument>;
    update(id: string, updateUserDto: UpdateUserDto): Promise<import("../schema/user.schema").UserDocument>;
    remove(id: string): string;
}
