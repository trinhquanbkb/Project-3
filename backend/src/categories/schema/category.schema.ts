
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CategoryDocument = Category & Document;

@Schema({
  timestamps: true
})
export class Category {

  @Prop({
    required: true,
    type: String,
  })
  name: string;

}

export const CategorySchema = SchemaFactory.createForClass(Category);
