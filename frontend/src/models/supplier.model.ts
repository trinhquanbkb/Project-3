import { IPagination } from "./pagination.model";

export interface ISupplier {
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

export interface IUpdateSupplier {
	name: string;
	address: IAddress;
	phone: number;
	email: string;
}

export interface ICreateSupplier {
	name: string;
	address: IAddress;
	phone: number;
	email: string;
}

export interface ISupplierQuery {
	page: number;
	pageSize: number;
	filter: { name?: string };
	address?: IAddress;
}

export interface ITableSupplier {
	handleFilter: any;
	paginations: IPagination;
	handleViewSupplier: any;
	handleEditSupplier: any;
	handleDeleteSupplier: any;
	data:
		| {
				name: string;
				address: IAddress;
				phone: number;
				email: string;
		  }[]
		| null;
}
