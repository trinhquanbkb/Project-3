import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { configs } from 'src/config/configuration';
import { Warehouse } from 'src/warehouse/schema/warehouse.schema';

export type FinancialTransactionsDocument = FinancialTransaction & Document;


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
    type: String,
  })
  warehouseId: string

  @Prop({
    require: true,
    type: String
  })
  note: string

  @Prop({
    require: false,
    type: String,
    default: "Chờ duyệt"
  })
  status: string

  @Prop({
    require: true,
    type: Array<String>
  })
  products: Array<String>

}



export const FinancialTransactionSchema = SchemaFactory.createForClass(FinancialTransaction);
