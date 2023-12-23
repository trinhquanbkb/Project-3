// roles.controller.ts

import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Param,
  Body,
  UseGuards,
  Query,
} from '@nestjs/common';
import { OrdersService } from '../services/products.service';
import { ProductItemDTO } from '../dto/products.dto';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { FilterQuery } from 'mongoose';

@Controller('product_items')
@ApiTags('ProductItems')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('authorization')
export class OrdersController {
  constructor(private readonly rolesService: OrdersService) {}

  @Post()
  createRole(@Body() roleDto: ProductItemDTO) {
    return this.rolesService.createRole(roleDto);
  }

  @ApiQuery({
    name: 'page',
    type: Number,
    required: false,
    description: 'Page number',
  })
  @ApiQuery({
    name: 'pageSize',
    type: Number,
    required: false,
    description: 'Page size',
  })
  @ApiQuery({
    name: 'filter',
    type: String,
    required: false,
    description: 'Filter',
  })
  @Get()
  findAllRoles(@Query() pagination: any, @Query('filter') filter: string) {
    return this.rolesService.findAllRoles(
      pagination,
      JSON.parse(filter ? filter : '{}'),
    );
  }

  @Get(':id')
  findRoleById(@Param('id') id: string) {
    return this.rolesService.findRoleById(id);
  }

  @Get('/search/:search')
  searchProductItem(@Param('search') search: string) {
    return this.rolesService.search(search ? search : '');
  }

  @Put(':id')
  updateRole(@Param('id') id: string, @Body() roleDto: ProductItemDTO) {
    return this.rolesService.updateRole(id, roleDto);
  }

  @Delete(':id')
  deleteRole(@Param('id') id: string) {
    return this.rolesService.deleteRole(id);
  }
}
