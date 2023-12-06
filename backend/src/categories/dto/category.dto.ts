import { IsString, IsArray } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CategoryDTO {
  @ApiProperty({ example: 'Áo', description: 'Tên danh mục sản phẩm' })
  @IsString()
  name: string;

}