type ProductsType = {
    expriry_data: string;
    quantity: Number;
    price: Number;
    product_id: string;
    weight: Number;
};
export declare class CreateFinancialTransactionDto {
    supplierId: string;
    note: string;
    status: string;
    warehouseId: string;
    products: ProductsType[];
}
export {};
