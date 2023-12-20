import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { CategoryService } from '../services/category.service';
import { CreatecategoryDto } from '../dto/create-category.dto';
import { UpdatecategoryDto } from '../dto/update-category.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';

@Controller('Category')
@ApiTags('Category') 
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('authorization')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  create(@Body() createCategoryDto: CreatecategoryDto) {
    return this.categoryService.create({
      category_name: createCategoryDto.category_name,
    });
  }

  @Get()
  findAll() {
    return this.categoryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoryService.findOne({ _id: id });
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatecategoryDto: UpdatecategoryDto) {
    return this.categoryService.update(id, {
      category_name: updatecategoryDto.category_name,
    });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoryService.remove(+id);
  }
}
