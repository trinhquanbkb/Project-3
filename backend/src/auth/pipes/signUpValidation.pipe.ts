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
    this.validateRole(value);
    return value;
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
