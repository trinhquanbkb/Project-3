import { IsString, IsArray } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export type ProductItemType = {
  product_item_id: String;
  quantity: Number;
};

export type ProductsType = {
  product_id: String;
  product_item: ProductItemType[];
  priceSold: Number;
};

export class OrdersDTO {
  @ApiProperty({ example: 'Hà đông', description: 'Địa chỉ gửi' })
  @IsString()
  sender: string;

  @ApiProperty({ example: 'Cầu giấy', description: 'Địa chỉ nhận' })
  @IsString()
  receiver: string;

  @ApiProperty({
    example: [
      {
        product_id: 'id san pham',
        product_item: [{ product_item_id: 'id item', quantity: 1 }],
        price: 10000,
      },
    ],
    description: 'Mảng sản phẩm',
  })
  @IsString()
  products: ProductsType[];

  @ApiProperty({ example: 'Được kiểm tra', description: 'Ghi chú' })
  @IsString()
  note: string;

  @ApiProperty({ example: 'id', description: 'id shipping' })
  @IsString()
  shipping_id: string;
}
