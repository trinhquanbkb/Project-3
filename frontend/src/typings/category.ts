export interface TCategory {
	_id: string;
	parent_category: TCategory;
	name: string;
	slug: string;
	image: string;
	description: string;
	status: number;
	priority: number;
}
export interface IGetCategory {
	page: number;
	limit: number;
}

export interface ICreateCategory {
	name: string;
	description: string;
	image: string;
	parent_category: string;
	priority: number;
}

export interface IChangeCategory {
	category_id: string;
	name: string;
	description: string;
	image: string;
	parent_category: string;
	priority: number;
}

export interface IDeleteCategory {
	category_id: string;
}
