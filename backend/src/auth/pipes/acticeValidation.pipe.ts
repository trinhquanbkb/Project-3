import {
  Injectable,
  PipeTransform,
  UnauthorizedException,
} from '@nestjs/common';
import { compareSync } from 'bcrypt';
import { UsersService } from 'src/users/services/users.service';

@Injectable()
export class ActiveValidation implements PipeTransform<any> {
  constructor(protected readonly usersService: UsersService) {}
  async transform(value: any) {
    await this.validateOldPassword(value);
    return value;
  }

  async validateOldPassword(value: any) {
    const password = value.password;

    return true;

    // const user = await this.usersService.findOne({ username });

    // if (!user) {
    //   throw new UnauthorizedException('Username/password is invalid');
    // }

    // if (!compareSync(password, user.password)) {
    //   throw new UnauthorizedException('Username/password is invalid');
    // }
  }
}
