import { UsersService } from 'src/users/services/users.service';
import { SignInDto } from '../dto/sign-in.dto';
import { SignUpDto } from '../dto/sign-up.dto';
import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private readonly userService;
    private jwtService;
    constructor(userService: UsersService, jwtService: JwtService);
    signUp(data: SignUpDto): Promise<import("../../users/schema/user.schema").UserDocument>;
    signIn(data: SignInDto): Promise<{
        accessToken: string;
        credential: any;
    }>;
    checkIfDataSeeded(): Promise<boolean>;
}
