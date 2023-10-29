import { AuthService } from '../services/auth.service';
import { SignUpDto } from '../dto/sign-up.dto';
import { SignInDto } from '../dto/sign-in.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    signUp(body: SignUpDto): Promise<import("../../users/schema/user.schema").UserDocument>;
    signIn(body: SignInDto): Promise<{
        accessToken: string;
        credential: any;
    }>;
    activeAccount(): Promise<boolean>;
}
