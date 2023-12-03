import { IPagination } from "./pagination.model";

export interface ICategory {
	_id: string;
	name: string;
	createdAt: Date;
	updatedAt: Date;
	__v: any;
}


export interface IUpdateCategory {
	name: string;
}

export interface ICreateCategory {
	name: string;
}

export interface ICategoryQuery {
	page: number;
	pageSize: number;
	name: string;
}

export interface ITableCategory {
	handleFilter: any;
	paginations: IPagination;
	handleViewCategory: any;
	handleEditCategory: any;
	handleDeleteCategory: any;
	data:
	| {
		name: string;
	}[]
	| null;
}