import { ApiProperty } from '@nestjs/swagger';

export class ActiveDto {
  @ApiProperty()
  old_password: string;

  @ApiProperty()
  password: string;
}
