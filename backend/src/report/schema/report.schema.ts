// roles.schema.ts

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ReportDocument = Report & Document;

@Schema({
  timestamps: true,
})
export class Report {
  @Prop({
    type: String,
  })
  product_id: string;

  @Prop({
    type: String,
  })
  user_id: string;

  @Prop({
    type: String,
  })
  warehouse_id: string;

  @Prop({
    required: true,
    type: String,
  })
  note: string;
}

export const ReportSchema = SchemaFactory.createForClass(Report);
