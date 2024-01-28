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
  Req,
} from '@nestjs/common';
import { ReportsService } from '../services/reports.service';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { ReportsDTO } from '../dto/products.dto';

@Controller('reports')
@ApiTags('Reports')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('authorization')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Post()
  createReport(@Req() req: any, @Body() reportDto: ReportsDTO) {
    return this.reportsService.createReport(req, reportDto);
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
  findAllReports(
    @Req() req: any,
    @Query() pagination: any,
    @Query('filter') filter: string,
  ) {
    return this.reportsService.findAllReports(
      req,
      pagination,
      JSON.parse(filter ? filter : '{}'),
    );
  }

  @Get(':id')
  findRoleById(@Req() request: any, @Param('id') id: string) {
    return this.reportsService.findRoleById(request, id);
  }

  @Put(':id')
  updateRole(@Param('id') id: string, @Body() reportDto: ReportsDTO) {
    return this.reportsService.updateRole(id, reportDto);
  }

  @Delete(':id')
  deleteRole(@Param('id') id: string) {
    return this.reportsService.deleteRole(id);
  }
}
