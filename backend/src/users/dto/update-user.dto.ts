import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiProperty({ required: false, type: String })
  username?: string;

  @ApiProperty({ required: false, type: String })
  phone?: string;

  @ApiProperty({ required: false, type: String })
  email?: string;

  @ApiProperty({ required: false, type: String })
  password?: string;

  @ApiProperty({ required: false, type: Boolean })
  isActive?: boolean;
}
