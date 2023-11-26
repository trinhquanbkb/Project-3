export type ProductsType = {
    product_id: [];
    quantity: String;
};
export declare class OrdersDTO {
    sender: string;
    receiver: string;
    products: ProductsType[];
    status: string;
    note: string;
}
