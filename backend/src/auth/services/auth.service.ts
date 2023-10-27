import { ObjectId } from 'mongodb';
import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { omit } from 'lodash';
import { UsersService } from 'src/users/services/users.service';
import { SignInDto } from '../dto/sign-in.dto';
import { SignUpDto } from '../dto/sign-up.dto';
import { JwtService } from '@nestjs/jwt';
import { ActiveDto } from '../dto/active.dto';
import { compareSync, hashSync } from 'bcrypt';
import { configs } from 'src/config/configuration';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signUp(data: SignUpDto) {
    data.password = hashSync(data.password, configs.saltOrRound)
    return await this.userService.create(data);
  }

  async signIn(data: SignInDto) {
    const user = await this.userService.findOne({ username: data.username });

    const credential = omit(user.toObject(), [
      'password',
      'createdAt',
      'updatedAt',
      '__v',
    ]);

    const accessToken = await this.jwtService.signAsync(credential);

    return { accessToken, credential };
  }

  async activeAccount(body: ActiveDto, token: string) {
    const verified = await this.jwtService.verifyAsync(token.split(' ')[1]);

    const user = await this.userService.findOne({
      _id: new ObjectId(verified._id),
    });

    if (!user) {
      throw new UnauthorizedException('User can not found');
    }

    if (compareSync(body.old_password, user.password)) {
      const updated = await this.userService.update(verified._id, {
        password: hashSync(body.password, configs.saltOrRound),
        isActive: true,
      });

      const credential = omit(updated.toObject(), [
        'password',
        'createdAt',
        'updatedAt',
        '__v',
      ]);

      const accessToken = await this.jwtService.signAsync(credential);

      return { accessToken, credential };
    } else {
      throw new BadRequestException('Old password is not invalid');
    }
  }
}
