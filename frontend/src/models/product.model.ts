import { IPagination } from "./pagination.model";

export interface IProduct {
    _id: string;
    product_name: string;
    quantity: number;
    url: string;
    products_items_item: Array<any>
    createdAt: Date;
    updatedAt: Date;
    __v: any;
}


export interface IUpdateProduct {
    product_name: string;
    quantity: number;
    url: string;
    products_items_item: Array<any>
}

export interface ICreateProduct {
    product_name: string;
    quantity: number;
    url: string;
    products_items_item: Array<any>
}

export interface IProductQuery {
    page: number;
    pageSize: number;
    product_name: string;
    quantity: number;
    url: string;
    products_items_item: Array<any>
}

export interface ITableProduct {
    handleFilter: any;
    paginations: IPagination;
    handleViewProduct: any;
    handleEditProduct: any;
    handleDeleteProduct: any;
    data:
    | {
        product_name: string;
        quantity: number;
        url: string;
        products_items_item: Array<any>
    }[]
    | null;
}