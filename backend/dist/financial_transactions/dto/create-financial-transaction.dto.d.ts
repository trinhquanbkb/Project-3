<<<<<<< HEAD
export declare class CreateFinancialTransactionDto {
    transaction_name: string;
    product_id: string;
    phone: string;
    email: string;
    quantity: Number;
    unit_price: Number;
    total_amount: Number;
    type: String;
    status: String;
}
=======
import { ProductType } from '../schema/financial-transaction.schema';
export declare class CreateFinancialTransactionDto {
    weight: number;
    supplierId: string;
    note: string;
    status: string;
    warehouseId: string;
    products: ProductType[];
}
>>>>>>> master
