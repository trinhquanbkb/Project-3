import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ReportsDTO {
  @ApiProperty({ example: '#agst4g4gs', description: 'Id sản phẩm' })
  @IsString()
  @IsNotEmpty()
  product_id: string;

  @ApiProperty({ example: '#agst4g4gs', description: 'Id người gửi' })
  @IsString()
  @IsNotEmpty()
  user_id: string;

  @ApiProperty({ example: '#agst4g4gs', description: 'Id kho hàng' })
  @IsString()
  @IsNotEmpty()
  warehouse_id: string;

  @ApiProperty({
    example: 'Cần đặt thêm sản phẩm',
    description: 'Ghi chú của báo cáo',
  })
  @IsString()
  @IsNotEmpty()
  note: string;
}
