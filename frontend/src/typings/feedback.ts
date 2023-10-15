export interface TFeedback {
	_id: string;
	store_id: string;
	rank_value: string;
	content: TContent[];
	create_time: string;
}
export interface IGetFeedback {
	page: number;
	limit: number;
	store_id: string;
}
export interface TContent {
	_id: string;
	store_id: string;
	rank_value: string;
	content: string;
	status: number;
	priority: number;
}
export interface ICreateFeedback {
	order_id: string;
	rank_value: string;
	content: string;
}
