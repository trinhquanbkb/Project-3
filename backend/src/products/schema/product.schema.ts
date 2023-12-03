// roles.schema.ts

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProductDocument = Product & Document;

@Schema({
  timestamps: true
})
export class Product {

  @Prop({
    required: true,
    type: String,
  })
  product_name: string;

  @Prop({
    required: true,
    type: Number,
  })
  quantity: number;

  @Prop({
    required: true,
    type: Array<any>,
  })
  category: Array<string>;

  @Prop({
    required: true,
    type: String,
  })
  url: string;

  @Prop({
    required: false,
    type: Array,
  })
  products_items_item: Array<string>;

}

export const ProductSchema = SchemaFactory.createForClass(Product);
