export type ProductItemType = {
    product_item_id: String;
    quantity: Number;
};
export type ProductsType = {
    product_id: String;
    product_item: ProductItemType[];
    price: Number;
};
export declare class OrdersDTO {
    sender: string;
    receiver: string;
    products: ProductsType[];
    note: string;
    shipping_id: string;
}
