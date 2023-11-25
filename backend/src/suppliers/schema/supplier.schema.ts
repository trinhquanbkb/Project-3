import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { configs } from 'src/config/configuration';

export type SupplierDocument = Supplier & Document;

@Schema({
  timestamps: true
})
export class Supplier {

  @Prop({
    required: true,
    type: String,
  })
  supplier_name: string;

  @Prop({
    required: false,
    type: String,
  })
  address: string;

  @Prop({
    required: false,
    type: String,
  })
  phone: string;

  @Prop({
    required: false,
    type: String,
  })
  email: string;

}

export const SupplierSchema = SchemaFactory.createForClass(Supplier);
