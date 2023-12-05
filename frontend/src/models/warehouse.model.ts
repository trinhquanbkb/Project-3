import { IPagination } from "./pagination.model";

export interface IWarehouse {
	_id: string;
	name: string;
	address: IAddress;
	createdAt: Date;
	updatedAt: Date;
	__v: any;
}

export interface IAddress {
	district: string;
	wards: string;
	city: string;
	address: string;
}



export interface IUpdateWarehouse {
	name: string;
	address: IAddress;
}

export interface ICreateWarehouse {
	name: string;
	address: IAddress;
}

export interface IWarehouseQuery {
	page: number;
	pageSize: number;
	filter: {};
}

export interface ITableWarehouse {
	handleFilter: any;
	paginations: IPagination;
	handleViewWarehouse: any;
	handleEditWarehouse: any;
	handleDeleteWarehouse: any;
	data:
	| {
		name: string;
		address: IAddress;
	}[]
	| null;
}