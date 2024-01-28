// roles.schema.ts

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ProductsItemType } from '../dto/products.dto';

export type ProductDocument = Product & Document;

@Schema({
  timestamps: true,
})
export class Product {
  @Prop({
    required: true,
    type: String,
  })
  product_name: string;

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
    required: true,
    type: Object,
  })
  product_items: ProductsItemType[];
}

export const ProductSchema = SchemaFactory.createForClass(Product);
