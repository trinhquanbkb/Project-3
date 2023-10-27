import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiProperty({ required: false, type: String })
  password?: string;

  @ApiProperty({ required: false, type: Boolean })
  isActive?: boolean;
}
