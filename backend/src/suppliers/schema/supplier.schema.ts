import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type SupplierDocument = Supplier & Document;

@Schema({
  timestamps: true
})
export class Supplier {

  @Prop({
    required: true,
    type: String,
  })
  name: string;

  @Prop({
    required: false,
    type: Object,
  })
  address: Object;

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
