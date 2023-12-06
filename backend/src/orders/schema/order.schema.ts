// roles.schema.ts

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ProductsType } from '../dto/orders.dto';

export type OrderDocument = Order & Document;

@Schema({
  timestamps: true
})
export class Order {

  @Prop({
    required: true,
    type: String,
  })
  sender: string;

  @Prop({
    required: true,
    type: String,
  })
  receiver: string;

  @Prop({
    required: true,
    type: Object,
  })
  products: ProductsType[];

  @Prop({
    required: true,
    type: String,
  })
  status: string;

  @Prop({
    required: false,
    type: String,
  })
  note: string;

}

export const OrderSchema = SchemaFactory.createForClass(Order);