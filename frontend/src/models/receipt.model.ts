import { IPagination } from "./pagination.model";

export interface IReceipt {}

export interface IReceiptQuery {
	page: number;
	pageSize: number;
}

export interface ITableReceipt {
	handleFilter: any;
	paginations: IPagination;
	handleViewReceipt: any;
	handleEditReceipt: any;
	handleDeleteReceipt: any;
	data:
		| {
				code: string;
				supplier: string;
				quantity: number;
				weight: number;
				note: string;
		  }[]
		| null;
}
