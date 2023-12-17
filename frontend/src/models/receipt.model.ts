import { IPagination } from "./pagination.model";
import { ISupplier } from "./supplier.model";
import { IWarehouse } from "./warehouse.model";

export interface IReceipt {
	_id: string;
	supplierId: ISupplier;
	weight: number;
	note: string;
	status: string;
	products: {
		name: string;
		quantity: number;
		price: number;
		total: number;
		weight: number;
		category: string;
	}[];
	warehouseId: IWarehouse;
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
