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
import { WarehousesService } from '../services/warehouses.service';
import { WarehouseDTO } from '../dto/warehouse.dto';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { FilterQuery } from 'mongoose';

@Controller('warehouses')
@ApiTags('Warehouses')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('authorization')
export class WarehousesController {
  constructor(private readonly warehouseService: WarehousesService) {}

  @Post()
  createWarehouse(@Body() warehouseDto: WarehouseDTO) {
    return this.warehouseService.createWarehouse(warehouseDto);
  }

  @Get()
  @ApiQuery({ name: 'page', type: Number, required: false, description: 'Page number' })
  @ApiQuery({ name: 'pageSize', type: Number, required: false, description: 'Page size' })
  @ApiQuery({ name: 'filter', type: String, required: false, description: 'Filter' })
  async findAll(@Query() pagination: any, @Query('filter') filter: string) {
    return this.warehouseService.findAllRoles(pagination, JSON.parse(filter?filter:"{}"));
  }

  @Get(':id')
  findWarehouseById(@Param('id') id: string) {
    return this.warehouseService.findWarehouseById(id);
  }

  @Put(':id')
  updateWarehouse(@Param('id') id: string, @Body() warehouseDto: WarehouseDTO) {
    return this.warehouseService.updateWarehouse(id, warehouseDto);
  }

  @Delete(':id')
  deleteWarehouse(@Param('id') id: string) {
    return this.warehouseService.deleteWarehouse(id);
  }
}
