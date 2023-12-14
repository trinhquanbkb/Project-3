import { ProductType } from '../schema/financial-transaction.schema';
export declare class CreateFinancialTransactionDto {
    weight: number;
    supplierId: string;
    note: string;
    status: string;
    warehouseId: string;
    products: ProductType[];
}
