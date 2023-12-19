import { IsString, IsOptional } from 'class-validator';

export class UpdateSupplierDto {
  @IsOptional()
  @IsString()
  supplier_name?: string;

  @IsOptional()
  @IsString()
  address?: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsString()
  email?: string;
}
