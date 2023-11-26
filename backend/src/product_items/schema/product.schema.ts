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
    required: true,
    type: Number,
  })
  price: Number;

  @Prop({
    required: true,
    type: String,
  })
  warehouse_id: string;

  @Prop({
    required: true,
    type: String,
  })
  supplier_id: string;

}

export const ProductItemSchema = SchemaFactory.createForClass(ProductItem);
