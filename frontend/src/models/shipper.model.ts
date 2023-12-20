import { IPagination } from "./pagination.model";

export interface IShipper {
	_id: string;
	name: string;
	address: IAddress;
	phone: number;
	email: string;
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



export interface IUpdateShipper {
	name: string;
	address: IAddress;
	phone: number;
	email: string;
}

export interface ICreateShipper {
	name: string;
	address: IAddress;
	phone: number;
	email: string;
}

export interface IShipperQuery {
	page: number;
	pageSize: number;
	filter: {};
}

export interface ITableShipper {
	handleFilter: any;
	paginations: IPagination;
	handleViewShipper: any;
	handleEditShipper: any;
	handleDeleteShipper: any;
	data:
	| {
		name: string;
		address: IAddress;
		phone: number;
		email: string;
	}[]
	| null;
}