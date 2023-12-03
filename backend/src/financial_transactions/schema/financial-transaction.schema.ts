import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { configs } from 'src/config/configuration';

export type FinancialTransactionsDocument = FinancialTransaction & Document;


export type ProductType = {
  name: string;
  quantity: number;
  price: number;
  total: number;
  productItemId: string|undefined;
  weight: number;
  category: string;
}

@Schema({
  timestamps: true
})
export class FinancialTransaction {

  @Prop({
    require: true,
    type: String,
  })
  id: string;

  @Prop({
    require: true,
    type: Number,
  })
  weight: number;

  @Prop({
    require: true,
    type: String
  })
  supplierId: string

  @Prop({
    require: true,
    type: String
  })
  warehouseId: string

  @Prop({
    require: true,
    type: String
  })
  note: string

  @Prop({
    require: true,
    type: String
  })
  status: string

  @Prop({
    require: true,
    type: Array<ProductType>
  })
  products: Array<ProductType>

}

export const FinancialTransactionSchema = SchemaFactory.createForClass(FinancialTransaction);
