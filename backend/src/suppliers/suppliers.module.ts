import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Supplier, SupplierSchema } from './schema/supplier.schema';
import { SuppliersController } from './controllers/suppliers.controller';
import { SuppliersService } from './services/suppliers.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: Supplier.name, schema: SupplierSchema }]),
  ],
  controllers: [SuppliersController],
  providers: [SuppliersService],
})
export class SuppliersModule {}
