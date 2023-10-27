import { ApiProperty } from '@nestjs/swagger';
import { Role } from '../enums/types.enum';

export class SignUpDto {
  @ApiProperty()
  username: string;

  @ApiProperty()
  password: string;

  @ApiProperty()
  role: Role[];
}
