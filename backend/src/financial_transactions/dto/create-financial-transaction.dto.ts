import { IsString, IsOptional, IsNumber, IsArray } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';


type ProductsType = {
  expriry_data: string,
  quantity: Number,
  price: Number,
  product_id: string,
  weight: Number
}

export class CreateFinancialTransactionDto {
  @ApiProperty({ example: "656ea7bf54a30218aea8cb80" })
  @IsString()
  supplierId: string;

  @ApiProperty({ example: "jsfh" })
  @IsString()
  note: string;

  @ApiProperty({ example: "65661aae5d6716968c2b811a" })
  @IsString()
  warehouseId: string;

  @ApiProperty({
    example: [{
      expriry_data: "20/11/2022",
      quantity: 21,
      price: 21000,
      product_id: '656fce775c72bc1cef5b4d5a',
      weight: 30
    }]
  })
  @IsArray()
  products: ProductsType[];

}
