import { IsString } from 'class-validator';

export class CreatecategoryDto {
  @IsString()
  category_name: string;
}
