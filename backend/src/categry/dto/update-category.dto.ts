import { IsString } from 'class-validator';

export class UpdatecategoryDto {
  @IsString()
  category_name: string;
}
