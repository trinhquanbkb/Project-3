import { IPagination } from "./pagination.model";

export interface IUser {
	password: string;
	_id: string;
	username: string;
	email: string;
	phone: string;
	role_id: number;
	parent_id: number;
	warehouse_id: number;
	createdAt: Date;
	updatedAt: Date;
	__v: any;
}

export interface IUpdateUser {
	username: string;
	phone: string;
	email: string;
	password: string;
}

export interface ICreateUser {
	username: string;
	phone: string;
	email: string;
	password: string;
	role_id: number;
	warehouse_id: number;
}

export interface IUserQuery {
	page: number;
	pageSize: number;
	filter: { username?: string; role_id: string; email: string };
}

export interface ITableUser {
	handleFilter: any;
	paginations: IPagination;
	handleViewUser: any;
	handleEditUser: any;
	handleDeleteUser: any;
	data:
		| {
				code: string;
				username: string;
				phone: string;
				email: string;
		  }[]
		| null;
}
