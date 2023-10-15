export interface TStore {
	_id: string;
	store_id: string;
	fullname: string;
	type: string;
	status: number;
	phone: string;
	pos_id: string;
	create_time: string;
}
export interface IGetStore {
	page: number;
	limit?: number;
	store_category?: number;
	select?: string;
	admin?: boolean;
}

export interface ICreateStore {
	store_id: string;
	status: number;
	store_category?: number;
}

export interface IChangeStore {
	store_id: string;
	new_password: string;
}

export interface IDeleteStore {
	store_id: string;
}
