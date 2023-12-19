import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Shipping, ShippingSchema } from './schema/shipping.schema';
import { ShippingsController } from './controllers/shipping.controller';
import { ShippingsService } from './services/shipping.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: Shipping.name, schema: ShippingSchema }]),
  ],
  controllers: [ShippingsController],
  providers: [ShippingsService],
})
export class ShippingsModule {}
