import { IPagination } from "./pagination.model";

export interface IProduct {
	_id: string;
	product_name: string;
	quantity: number;
	url: string;
	product_items: Array<any>;
	createdAt: string;
	updatedAt: string;
	__v: any;
	quantitySold: number;
	totalWeight: number;
}

export interface IUpdateProduct {
	product_name: string;
	quantity: number;
	url: string;
	products_items_item: Array<any>;
}

export interface ICreateProduct {
	product_name: string;
	quantity: number;
	url: string;
	products_items_item: Array<any>;
}

export interface IProductQuery {
	page: number;
	pageSize: number;
	product_name: string;
	quantity: number;
	url: string;
	products_items_item: Array<any>;
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
				products_items_item: Array<any>;
		  }[]
		| null;
}

export interface IProductItem {
	_id: string;
	expriry_data: string;
	quantity: number;
	weight: number;
	price: number;
	warehouse_id: string;
	supplier_id: string;
	product_id: string;
	quantity_sold: number;
	hide: boolean;
	createdAt: string;
	updatedAt: string;
}

export interface ITableInventory {
	handleFilter: any;
	paginations: IPagination;
	handleViewInventory: any;
	data:
		| {
				code: string;
				name: string;
				quantity: number;
				quantitySold: number;
				totalWeight: number;
		  }[]
		| null;
}
