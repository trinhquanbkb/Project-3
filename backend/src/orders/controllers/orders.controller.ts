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
import { OrdersService } from '../services/orders.service';
import { OrdersDTO } from '../dto/orders.dto';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';

@Controller('orders')
@ApiTags('Orders')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('authorization')
export class OrdersController {
  constructor(private readonly rolesService: OrdersService) {}

  @Post()
  createRole(@Body() roleDto: OrdersDTO) {
    return this.rolesService.createRole(roleDto);
  }

  @Post('/approve/:id')
  approve(
    @Param('id') id: string,
    @Body()
    roleDto: { shipping_id: string; tracking: string; shippingFee: number },
  ) {
    return this.rolesService.update(id, {
      status: 'Thành công',
      shipping_id: roleDto.shipping_id,
      tracking: roleDto.tracking,
      shippingFee: roleDto.shippingFee,
    });
  }

  @Post('/waiting_for_delivery/:id')
  waiting(@Param('id') id: string) {
    return this.rolesService.update(id, { status: 'Chờ xuất kho' });
  }

  @Post('/cancel/:id')
  cancel(@Param('id') id: string) {
    return this.rolesService.update(id, { status: 'Huỷ' });
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

  @Put(':id')
  updateRole(@Param('id') id: string, @Body() roleDto: OrdersDTO) {
    return this.rolesService.update(id, roleDto);
  }

  @Delete(':id')
  deleteRole(@Param('id') id: string) {
    return this.rolesService.deleteRole(id);
  }
}
