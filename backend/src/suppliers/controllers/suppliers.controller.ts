
import { Controller, Post, Get, Put, Delete, Param, Body, UseGuards, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { SuppliersService } from '../services/suppliers.service';
import { CreateSupplierDto } from '../dto/create-supplier.dto';

@Controller('suppliers')
@ApiTags('Suppliers')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('authorization')
export class SuppliersController {
  constructor(private readonly rolesService: SuppliersService) {}

  @Post()
  createRole(@Body() roleDto: CreateSupplierDto) {
    return this.rolesService.createRole(roleDto);
  }

  @ApiQuery({ name: 'page', type: Number, required: false, description: 'Page number' })
  @ApiQuery({ name: 'pageSize', type: Number, required: false, description: 'Page size' })
  @ApiQuery({ name: 'filter', type: String, required: false, description: 'Filter' })
  @Get()
  findAllRoles(@Query() pagination: any, @Query('filter') filter: string) {
    const parsedFilter = JSON.parse(filter?filter:"{}");
    return this.rolesService.findAllRoles(pagination, parsedFilter);
  }

  @Get(':id')
  findRoleById(@Param('id') id: string) {
    return this.rolesService.findRoleById(id);
  }

  @Put(':id')
  updateRole(@Param('id') id: string, @Body() roleDto: CreateSupplierDto) {
    return this.rolesService.updateRole(id, roleDto);
  }

  @Delete(':id')
  deleteRole(@Param('id') id: string) {
    return this.rolesService.deleteRole(id);
  }
}
