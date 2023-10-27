import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { UsersService } from 'src/users/services/users.service';
import { SignUpDto } from '../dto/sign-up.dto';
import { Gender, Role } from '../enums/types.enum';
import { regEmail, regPassword, regPhone, regUsername } from '../utils/regex';
import { isValid } from 'date-fns';

@Injectable()
export class SignUpValidation implements PipeTransform<any> {
  constructor(protected readonly usersService: UsersService) {}
  async transform(value: SignUpDto) {
    await this.validateUsername(value);
    this.validateRole(value);
    return value;
  }

  async validateUsername(value: any) {
    const username = value.username;

    const existUsername = await this.usersService.findOne({ username });

    if (existUsername) {
      throw new BadRequestException('Username has been already used');
    }

    if (!regUsername.test(username)) {
      throw new BadRequestException(
        'Username must include string and number may include _ and – having a length of 3 to 16 characters ',
      );
    }
  }


  validateRole(value: any) {
    const role = value.role;

    role?.map((r: any) => {
      if (!Object.values(Role).includes(r)) {
        throw new BadRequestException('Role is invalid');
      }
    });
  }
}
