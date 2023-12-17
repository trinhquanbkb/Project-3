// roles.schema.ts

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProductItemDocument = ProductItem & Document;

@Schema({
  timestamps: true
})
export class ProductItem {

  @Prop({
    required: false,
    type: String,
  })
  expriry_data: string;

  @Prop({
    required: true,
    type: Number,
  })
  quantity: Number;

  @Prop({
    type: Number,
  })
  price: Number;

  @Prop({
    type: String,
  })
  warehouse_id: string;

  @Prop({
    type: String,
  })
  supplier_id: string;

  @Prop({
    type: String,
  })
  product_id: string;

}

export const ProductItemSchema = SchemaFactory.createForClass(ProductItem);
