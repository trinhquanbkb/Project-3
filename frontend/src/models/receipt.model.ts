import { IPagination } from "./pagination.model";
import { IProduct } from "./product.model";
import { ISupplier } from "./supplier.model";
import { IWarehouse } from "./warehouse.model";

export interface IReceipt {
	_id: string;
	supplierId: ISupplier;
	weight: number;
	note: string;
	status: string;
	products: {
		_id: string;
		name: string;
		quantity: number;
		price: number;
		total: number;
		weight: number;
		expriry_data: string;
		createdAt: string;
		hide: boolean;
		quantity_sold: number;
		product_id: IProduct;
	}[];
	warehouseId: IWarehouse;
	createdAt: string | undefined;
}

export interface IReceiptQuery {
	page: number;
	pageSize: number;
}

export interface IUpdateReceipt {
	supplierId: string;
	weight: number;
	note: string;
	products: Array<any>;
	status: string;
	warehouseId: string;
}

export interface ICreateReceipt {
	supplierId: string;
	note: string;
	products: {
		expriry_data: string;
		quantity: number;
		price: number;
		product_id: string;
		weight: number;
	}[];
	warehouseId: string;
}

export interface ITableReceipt {
	handleFilter: any;
	paginations: IPagination;
	handleViewReceipt: any;
	handleEditReceipt: any;
	handleDeleteReceipt: any;
	handleApproveReceipt: any;
	data:
		| {
				id: string;
				supplierId: string;
				quantity: number;
				weight: number;
				note: string;
				warehouseId: string;
		  }[]
		| null;
}
