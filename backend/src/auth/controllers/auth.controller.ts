import { Body, Controller, Get, Headers, Post, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from '../services/auth.service';
import { SignUpDto } from '../dto/sign-up.dto';
import { SignInDto } from '../dto/sign-in.dto';
import { SignUpValidation } from '../pipes/signUpValidation.pipe';
import { SignInValidation } from '../pipes/signInValidation.pipe';
import { JwtAuthGuard } from '../guards/jwt.guard';
import { ActiveDto } from '../dto/active.dto';
import { ActiveValidation } from '../pipes/acticeValidation.pipe';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
  ) { }

  @Post('sign-up')
  async signUp(@Body(SignUpValidation) body: SignUpDto) {
    const data = await this.authService.signUp(body);
    return data;
  }

  @Post('sign-in')
  async signIn(@Body(SignInValidation) body: SignInDto) {
    return await this.authService.signIn(body);
  }

  @Get('check')
  @UseGuards(JwtAuthGuard)
  async activeAccount() {
    return true;
  }
}
