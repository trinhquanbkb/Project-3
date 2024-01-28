export type ProductsItemType = {
    _id: String;
    expriry_data: String;
    quantity: Number;
    weight: Number;
    price: Number;
    warehouse_id: String;
    supplier_id: String;
    product_id: String;
    quantity_sold: Number;
    hide: Boolean;
    createdAt: String;
    updatedAt: String;
};
export declare class ProductsDTO {
    product_name: string;
    category: String[];
    url: string;
}
