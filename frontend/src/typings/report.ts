import { TStore } from "./store";

export interface TReport {
	overview: number[];
	paginationInfo?: {
		limit: number;
		page: number;
		total: number;
	};
	data: {
		name: string;
		_id: string;
		total_count: number[];
		detail: TDetails;
		store_id: TStore;
		report_time: string;
	}[];
}
export interface IGetReport {
	start_time: string;
	end_time: string;
	store_id?: string;
}
export interface TDetails {
	_id: string;
	name: string;
	value: number;
}
