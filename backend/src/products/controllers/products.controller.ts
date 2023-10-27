import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ProductsService } from '../services/products.service';
import { CreateProductDto, typeImage } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { ImagesService } from 'src/images/images.service';
import { CategoriesService } from 'src/categories/services/categories.service';

@Controller('products')
@ApiTags('Products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService, private readonly imagesService: ImagesService, private readonly categoriesService: CategoriesService) { }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('authorization')
  @Post()
  async create(@Body() createProductDto: CreateProductDto) {
    createProductDto.url = await this.imagesService.upload(createProductDto.url)
    Promise.all(
      createProductDto.images.map(async (image) => ({
        ...image,
        url: await this.imagesService.upload(image.url)
      }))
    ).then(images => {
      createProductDto.images = images
      return this.productsService.create(createProductDto);
    })
  }

  @Get()
  findAll() {
    return this.productsService.findAll();
  }
  @Post('find')
  findByFillter(@Body() updateProductDto: UpdateProductDto) {
    return this.productsService.findAll(updateProductDto)
  }

  @Post('search')
  async findBySearch(@Body() search: any) {
    const products = await this.productsService.findAll({
      name: {
        $elemMatch: {
          name: {
            $regex: search.query,
            $options: "i"
          }
        }
      }
    })
    let values = await Promise.all(
      products.map(async (e) => ({
        name: e.name,
        url: e.url,
        price: e.price,
        category: await this.categoriesService.findOne({ _id: e.category_id })
      }))
    )
    let rs = values.map(v => ({
      name: v.name,
      url: v.url,
      price: v.price,
      path: (v.category.page == 'home' ? '' : `/${v.category.page}`) + '/' + v.category.name[0].name + '/' + v.name[0].name
    }))

    return rs
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne({ _id: id });
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('authorization')
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    updateProductDto.url = await this.imagesService.upload(updateProductDto.url)
    Promise.all(
      updateProductDto.images.map(async (image) => ({
        ...image,
        url: await this.imagesService.upload(image.url)
      }))
    ).then(images => {
      updateProductDto.images = images
      return this.productsService.update(id, updateProductDto);
    })
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('authorization')
  @Post('deleteByParentID')
  async removeByParentID(@Body() parentID: any) {
    const products = await this.productsService.findAll({ category_id: parentID?.id })
    products.forEach(async p => {
      const product = await this.productsService.findOne({ _id: p?.id });
      this.imagesService.delete(product.url.split('/').pop())
      product.images.forEach((image) => ({
        url: this.imagesService.delete(image.url.split('/').pop())
      }))
    })
    return this.productsService.removeAll({ category_id: parentID?.id });
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('authorization')
  @Delete(':id')
  async remove(@Param('id') id: string) {
    const product = await this.productsService.findOne({ _id: id });
    this.imagesService.delete(product.url.split('/').pop())
    product.images.forEach((image) => ({
      url: this.imagesService.delete(image.url.split('/').pop())
    }))

    return this.productsService.remove(id);
  }
}
