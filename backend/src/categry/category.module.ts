import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { category, categorySchema } from './schema/category.schema';
import { CategoryController } from './controllers/category.controller';
import { CategoryService } from './services/category.service';
import { CategoryRepository } from './repository/category.repository';

@Module({
  imports: [MongooseModule.forFeature([{ name: category.name, schema: categorySchema }]),
  ],
  controllers: [CategoryController],
  providers: [CategoryService, CategoryRepository],
})
export class CategoryModule {}
