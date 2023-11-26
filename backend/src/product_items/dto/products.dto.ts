import { IsString, IsArray, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ProductItemDTO {
  @ApiProperty({ example: '20/11/2023', description: 'Ngày hết hạn' })
  @IsString()
  expriry_data: string;

  @ApiProperty({ example: 1, description: 'Số lượng' })
  @IsNumber()
  quantity: number;

  @ApiProperty({ example: 23000, description: 'Giá tiền' })
  @IsArray()
  price: Number;

  @ApiProperty({ example: '', description: 'id của kho' })
  @IsNumber()
  warehouse_id: string;

  @ApiProperty({ example: '', description: 'id đối tác' })
  @IsNumber()
  supplier_id: string;
}