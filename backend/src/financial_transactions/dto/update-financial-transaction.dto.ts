import { IsString, IsOptional, IsNumber } from 'class-validator';

export class UpdateFinancialTransactionDto {
  @IsString()
  transaction_name: string;

  @IsString()
  product_id: string;

  @IsString()
  phone: string;

  @IsString()
  email: string;

  @IsNumber()
  quantity: Number;

  @IsNumber()
  unit_price: Number;

  @IsNumber()
  total_amount: Number;

  @IsString()
  type: String;

  @IsString()
  status: String;

}
