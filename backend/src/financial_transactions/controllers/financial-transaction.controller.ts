import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { FinancialTransactionService } from '../services/financial-transaction.service';
import { CreateFinancialTransactionDto } from '../dto/create-financial-transaction.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';

@Controller('financial-transaction')
@ApiTags('FinancialTransaction')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('authorization')
export class FinancialTransactionController {
  constructor(
    private readonly financialTransactionService: FinancialTransactionService,
  ) {}

  @Post()
  async create(
    @Body() createFinancialTransactionDto: CreateFinancialTransactionDto,
  ) {
    return this.financialTransactionService.create(
      createFinancialTransactionDto,
    );
  }

  @Post('/approve/:id')
  async approve(@Param('id') id: string) {
    return this.financialTransactionService.update(id, {
      status: 'Thành công',
    });
  }

  @Post('/cancel/:id')
  async cancel(@Param('id') id: string) {
    return this.financialTransactionService.update(id, { status: 'Huỷ' });
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
  findAll(@Query() pagination: any, @Query('filter') filter: string) {
    const parsedFilter = JSON.parse(filter ? filter : '{}');
    return this.financialTransactionService.findAll(pagination, parsedFilter);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.financialTransactionService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateFinancialTransactionDto: CreateFinancialTransactionDto,
  ) {
    return this.financialTransactionService.update(
      id,
      updateFinancialTransactionDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.financialTransactionService.remove(id);
  }
}
