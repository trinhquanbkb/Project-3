import { IsString, IsArray } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';


export type ProductsType = {
  product_id: [],
  quantity: String,
}

export class OrdersDTO {
  @ApiProperty({ example: 'Hà đông', description: 'Địa chỉ gửi' })
  @IsString()
  sender: string;

  @ApiProperty({ example: 'Cầu giấy', description: 'Địa chỉ nhận' })
  @IsString()
  receiver: string;

  @ApiProperty({ example: [{}], description: 'Mảng sản phẩm' })
  @IsString()
  products: ProductsType[];

  @ApiProperty({ example: 'Đang giao', description: 'Trạng thái' })
  @IsString()
  status: string;

  @ApiProperty({ example: 'Được kiểm tra', description: 'Ghi chú' })
  @IsString()
  note: string;
}