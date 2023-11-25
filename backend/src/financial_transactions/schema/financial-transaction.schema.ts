import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { configs } from 'src/config/configuration';

export type FinancialTransactionsDocument = FinancialTransaction & Document;

@Schema({
  timestamps: true
})
export class FinancialTransaction {

  @Prop({
    required: true,
    type: String,
  })
  transaction_name: string;

  @Prop({
    required: true,
    type: String,
  })
  product_id: string;

  @Prop({
    required: true,
    type: Number,
  })
  quantity: Number;

  @Prop({
    required: true,
    type: Number,
  })
  unit_price: Number;

  @Prop({
    required: true,
    type: Number,
  })
  total_amount: Number;

  @Prop({
    required: true,
    type: String,
  })
  type: String;
  
  @Prop({
    required: true,
    type: String,
  })
  status: String;

}

export const FinancialTransactionSchema = SchemaFactory.createForClass(FinancialTransaction);
