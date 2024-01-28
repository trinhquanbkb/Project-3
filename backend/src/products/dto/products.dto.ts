import { IsString, IsArray, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export type ProductsItemType = {
  _id: String;
  expriry_data: String;
  quantity: Number;
  weight: Number;
  price: Number;
  warehouse_id: String;
  supplier_id: String;
  product_id: String;
  quantity_sold: Number;
  hide: Boolean;
  createdAt: String;
  updatedAt: String;
};

export class ProductsDTO {
  @ApiProperty({ example: 'Áo phông', description: 'Tên địa chỉ' })
  @IsString()
  product_name: string;

  @ApiProperty({ example: ['Áo'], description: 'Mảng phân loại sản phẩm' })
  @IsArray()
  category: String[];

  @ApiProperty({
    example:
      'https://scontent.fhan14-3.fna.fbcdn.net/v/t1.15752-9/398237708_218062464638041_381703009752984850_n.png?_nc_cat=103&ccb=1-7&_nc_sid=8cd0a2&_nc_ohc=dLbVrAE1GtQAX8bfZHz&_nc_ht=scontent.fhan14-3.fna&oh=03_AdRDhmengk_Kh0YTXeHpuqNeoCBgI_o0pDQK4BY4xnhjLQ&oe=658A886E',
    description: 'Địa chỉ hình ảnh',
  })
  @IsString()
  url: string;
}
