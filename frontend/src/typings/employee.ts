export interface TEmployee {
	_id: string;
	crm_user_id: string;
	parent_employee: TEmployee;
	email: string;
	phone: string;
	fullname: string;
	status: number;
	address: string;
	type: string;
	create_time: string;
	avatar: string;
	birthday: string;
}
export interface IGetEmployee {
	page: number;
	limit: number;
	fullname?: string;
	admin?: boolean;
}

export interface ICreateEmployee {
	_id: string;
	fullname: string;
	avatar: string;
	email: string;
	phone: string;
	birthday: string;
	address: string;
	type: string;
	status: number;
	create_time: string;
}

export interface IChangeEmployee {
	_id: string;
	fullname: string;
	image: string;
	email: string;
	phone: string;
	birthday: string;
	address: string;
	type: string;
	status: number;
	create_time: string;
	crm_user_id: string;
}

export interface IDeleteEmployee {
	crm_user_id: string;
}
