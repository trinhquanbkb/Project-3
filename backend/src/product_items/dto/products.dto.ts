import { IsString, IsArray, IsNumber, IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ProductItemDTO {
  @ApiProperty({ example: '20/11/2023', description: 'Ngày hết hạn' })
  @IsString()
  expriry_data: string;

  @ApiProperty({ example: 1, description: 'Số lượng' })
  @IsNumber()
  quantity: number;

  @ApiProperty({ example: 23000, description: 'Giá tiền' })
  price: number;

  @ApiProperty({ example: 23000, description: 'Cân nặng' })
  weight: number;

  @ApiProperty({ example: '', description: 'id của kho' })
  @IsString()
  warehouse_id: string;

  @ApiProperty({ example: '', description: 'id đối tác' })
  @IsString()
  supplier_id: string;

  @ApiProperty({ example: true, description: 'trạng thái huỷ' })
  @IsBoolean()
  hide: Boolean;

  @ApiProperty({ example: '', description: 'id sản phẩm' })
  @IsString()
  product_id: string;
}
