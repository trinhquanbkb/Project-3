import { TStore } from "./store";

export interface TCriteria {
	_id: string;
	rank_value: number;
	store_id: TStore;
	content: string;
	status: number;
	priority: number;
}
export interface IGetCriteria {
	page: number;
	limit: number;
	fullname?: string;
	store_id: string;
}

export interface ICreateCriteria {
	_id: string;
	fullname: string;
	criteria_id: string;
	store_id: string;
	priority: number;
}

export interface IChangeCriteria {
	criteria_id: string;
	rank_value: number;
	content: string;
	priority?: string;
	priority_order?: number;
	showToast?: boolean;
}

export interface IDeleteCriteria {
	criteria_id: string;
}
