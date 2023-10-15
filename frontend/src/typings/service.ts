import { TCategory } from "./category";
import { TSkills } from "./skills";
import { TUsers } from "./users";

export interface TService {
	_id: string;
	parent_service: TService;
	name: string;
	user_id: TUsers;
	category: TCategory[] | undefined;
	skill: TSkills[];
	description: string;
	providing_method: string;
	finish_estimated_time: string;
	lower_bound_fee: string;
	upper_bound_fee: string;
	status: number;
	type: string;
	create_time: string;
	expiration_time: string;
	image: [];
	sold_time: string;
	rate: string;
	number_of_rate: string;
	__v: string;
}

export interface IGetServices {
	page: number;
	limit: number;
	user_id?: string;
	category?: string;
	name?: string;
}

export interface ICreateService {
	name: string;
	description: string;
	skill: TSkills[];
	parent_Service: string;
	priority: number;
	providing_method: string;
	finish_estimated_time: string;
	lower_bound_fee: string;
	upper_bound_fee: string;
	expiration_time: string;
}

export interface IChangeService {
	Service_id: string;
	name: string;
	description: string;
	image: string;
	parent_Service: string;
	priority: number;
}

export interface IDeleteService {
	service_id: string;
}
