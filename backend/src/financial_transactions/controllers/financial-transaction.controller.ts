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
  Query,
} from '@nestjs/common';
import { FinancialTransactionService } from '../services/financial-transaction.service';
import { CreateFinancialTransactionDto } from '../dto/create-financial-transaction.dto';
import { UpdateFinancialTransactionDto } from '../dto/update-financial-transaction.dto';
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
  create(@Body() createFinancialTransactionDto: CreateFinancialTransactionDto) {
    return this.financialTransactionService.create(
      createFinancialTransactionDto,
    );
  }

  @Get()
  findAll(@Query() filter: any) {
    return this.financialTransactionService.findAll(filter);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.financialTransactionService.findOne({ _id: id });
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateFinancialTransactionDto: UpdateFinancialTransactionDto,
  ) {
    return this.financialTransactionService.update(
      id,
      updateFinancialTransactionDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.financialTransactionService.remove(+id);
  }
}
