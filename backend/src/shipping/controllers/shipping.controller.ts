
import { Controller, Post, Get, Put, Delete, Param, Body, UseGuards, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { ShippingsService } from '../services/shipping.service';
import { CreateShippingDto } from '../dto/create-shipping.dto';

@Controller('Shippings')
@ApiTags('Shippings')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('authorization')
export class ShippingsController {
  constructor(private readonly rolesService: ShippingsService) {}

  @Post()
  createRole(@Body() roleDto: CreateShippingDto) {
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
  updateRole(@Param('id') id: string, @Body() roleDto: CreateShippingDto) {
    return this.rolesService.updateRole(id, roleDto);
  }

  @Delete(':id')
  deleteRole(@Param('id') id: string) {
    return this.rolesService.deleteRole(id);
  }
}
