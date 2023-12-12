import { IsString, IsOptional, IsNumber, IsArray } from 'class-validator';
import { ProductType } from '../schema/financial-transaction.schema';
import { ApiProperty } from '@nestjs/swagger';

export class CreateFinancialTransactionDto {
  @ApiProperty({ example: 20 })
  @IsString()
  weight: number;

  @ApiProperty({ example: "jsfh" })
  @IsString()
  supplierId: string;

  @ApiProperty({ example: "jsfh" })
  @IsString()
  note: string;

  @ApiProperty({ example: "Thành công" })
  @IsString()
  status: string;

  @ApiProperty({ example: "jsfh" })
  @IsString()
  warehouseId: string;

  @ApiProperty({
    example: [{
      name: "Áo phông",
      quantity: 20,
      price: 10,
      total: 200,
      productItemId: "",
      weight: 30,
      category: ""
    }]
  })
  @IsArray()
  products: ProductType[];

}
