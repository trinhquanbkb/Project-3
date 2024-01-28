// roles.schema.ts

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ProductsType } from '../dto/orders.dto';

export type OrderDocument = Order & Document;

@Schema({
  timestamps: true,
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
    required: false,
    type: String,
    default: 'Chờ duyệt',
  })
  status: string;

  @Prop({
    required: false,
    type: String,
  })
  note: string;

  @Prop({
    required: false,
    type: String,
  })
  shipping_id: string;

  @Prop({
    required: true,
    type: String,
  })
  address: string;

  @Prop({
    required: false,
    type: String,
  })
  tracking: string;

  @Prop({
    required: false,
    type: Number,
  })
  shippingFee: string;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
