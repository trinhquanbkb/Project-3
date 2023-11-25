import { IsString, IsOptional } from 'class-validator';

export class CreateSupplierDto {
  @IsString()
  supplier_name: string;

  @IsString()
  @IsOptional()
  address?: string;

  @IsString()
  @IsOptional()
  phone?: string;

  @IsString()
  @IsOptional()
  email?: string;
}
