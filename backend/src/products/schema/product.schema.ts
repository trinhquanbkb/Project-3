import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Double, ObjectID } from 'mongodb';
import { Document } from 'mongoose';

export type ProductDocument = Product & Document;

type typeName = {
    name: string;
    language: string; 
}
type typeDes = {
    des: string;
    language: string; 
}

type typeImage = {
    name: typeName[];
    url: string;
    description: typeDes[]
}

@Schema({
  timestamps: true
})
export class Product {
  @Prop({
    required: true,
    type: Array,
  })
  name: typeName[];

  @Prop({
    type: Array,
  })
  description?: typeDes[];

  @Prop({
    required: false,
    type: String,
  })
  condition: string;

  @Prop({
    required: false,
    type: String,
  })
  size: string;

  @Prop({
    required: false,
    type: String,
  })
  weight: string;

  @Prop({
    required: false,
    type: String,
  })
  url: string;

  @Prop({
    required: true,
    type: Array,
  })
  images: typeImage[];

  @Prop()
  category_id: string;
  
  @Prop({
    required: true,
    type: Double,
  })
  price: number;

  @Prop({
    required: false,
    type: Double,
  })
  discounts?: number;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
