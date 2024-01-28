import { IPagination } from "./pagination.model";
import { IProduct } from "./product.model";
import { IUser } from "./user.model";
import { IWarehouse } from "./warehouse.model";

export interface IReport {
	_id: string;
	product_id: IProduct;
	user_id: IUser;
	warehouse_id: IWarehouse;
	note: string;
	createdAt: Date;
	updatedAt: Date;
}

export interface ICreateReport {
	product_id: string;
	note: string;
}

export interface ITableReport {
	handleFilter: any;
	paginations: IPagination;
	handleView: any;
	data:
		| {
				id: string;
				stt: number;
				username: string;
				productName: string;
				warehouse: string;
				createdAt: string;
				note: string;
				action?: any;
		  }[]
		| null;
}
