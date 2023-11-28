import { PipeTransform } from '@nestjs/common';
import { UsersService } from 'src/users/services/users.service';
import { SignUpDto } from '../dto/sign-up.dto';
export declare class SignUpValidation implements PipeTransform<any> {
    protected readonly usersService: UsersService;
    constructor(usersService: UsersService);
    transform(value: SignUpDto): Promise<SignUpDto>;
    validateRole(value: any): void;
}
