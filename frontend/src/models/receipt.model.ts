import { IPagination } from "./pagination.model";

export interface IReceipt {
	_id: string;
	supplierId: string;
	weight: number;
	note: string;
	products: Array<any>
	warehouseId: string;
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
	status: string
	warehouseId: string;
}

export interface ICreateReceipt {
	supplierId: string;
	weight: number;
	note: string;
	products: Array<any>;
	status: string;
	warehouseId: string;
}

export interface ITableReceipt {
	handleFilter: any;
	paginations: IPagination;
	handleViewReceipt: any;
	handleEditReceipt: any;
	handleDeleteReceipt: any;
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
