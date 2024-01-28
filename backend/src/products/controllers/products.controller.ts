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
  Response,
  Header,
  Res,
  Req,
} from '@nestjs/common';
import { OrdersService } from '../services/products.service';
import { ProductsDTO } from '../dto/products.dto';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import * as excel from 'exceljs';

@Controller('products')
@ApiTags('Products')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('authorization')
export class OrdersController {
  constructor(private readonly rolesService: OrdersService) {}

  @Post()
  createRole(@Body() roleDto: ProductsDTO) {
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
  findAllRoles(
    @Req() req: any,
    @Query() pagination: any,
    @Query('filter') filter: string,
  ) {
    return this.rolesService.findAllRoles(
      req,
      pagination,
      JSON.parse(filter ? filter : '{}'),
    );
  }

  @Get('/excel')
  @Header('Content-type', 'text/xlsx')
  async getExcelFile(@Res() res: any) {
    const data = await this.rolesService.getExcelFile();
    const workbook = new excel.Workbook();
    const worksheet = workbook.addWorksheet('Data');

    // Add headers
    worksheet.columns = [
      { header: 'Mã sản phẩm', key: 'id', width: 35 },
      { header: 'Tên sản phẩm', key: 'productName', width: 50 },
      { header: 'Ngày hết hạn', key: 'expriryData', width: 15 },
      { header: 'Số lượng tồn kho', key: 'quantity', width: 15 },
      { header: 'Đơn vị tính', key: 'weight', width: 15 },
      { header: 'Giá nhập', key: 'price', width: 15 },
      { header: 'Số lượng đã bán', key: 'quantitySold', width: 15 },
      { header: 'Trạng thái', key: 'hide', width: 15 },
      { header: 'Ngày tạo', key: 'createdAt', width: 15 },
    ];

    data.forEach((item) => {
      worksheet.addRow(item);
    });

    res.setHeader(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    );
    res.setHeader(
      'Content-Disposition',
      'attachment; filename=hang_ton_kho.xlsx',
    );

    workbook.xlsx.write(res).then(() => {
      res.end();
    });
  }

  @Get(':id')
  findRoleById(@Req() request: any, @Param('id') id: string) {
    return this.rolesService.findRoleById(request, id);
  }

  @Get('/search/:search')
  searchProduct(@Param('search') search: string) {
    return this.rolesService.search(search ? search : '');
  }

  @Post('test')
  findOne(@Body() filter: any) {
    return this.rolesService.findOne({});
  }

  @Put(':id')
  updateRole(@Param('id') id: string, @Body() roleDto: ProductsDTO) {
    return this.rolesService.updateRole(id, roleDto);
  }

  @Delete(':id')
  deleteRole(@Param('id') id: string) {
    return this.rolesService.deleteRole(id);
  }
}
