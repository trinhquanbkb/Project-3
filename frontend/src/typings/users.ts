import { Tracing } from "trace_events";
import { TCategory } from "./category";
import { TSkills } from "./skills";

export interface Contact {
	link: string;
}
export interface TUsers {
	_id: string;
	client_id: string;
	fullname: string;
	email: string;
	phone: string;
	birthday: string;
	address: string;
	status: number;
	create_time: string;
	categoty: TCategory[];
	skill: TSkills[];
	successful_rate: string;
	sold_time: string;
	rate_star: string;
	rate_number: Tracing;
	social_media_contact: Contact[];
	introduction: string;
}

export interface IGetUsers {
	page: number;
	limit: number;
}
