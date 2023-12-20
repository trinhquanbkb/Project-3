import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type categoryDocument = category & Document;

@Schema({
  timestamps: true
})
export class category {

  @Prop({
    required: true,
    type: String,
  })
  category_name: string;

}

export const categorySchema = SchemaFactory.createForClass(category);
