import { TCategory } from "./category";
import { TUsers } from "./users";

export interface TPosts {
	_id: string;
	title: string;
	user_id: TUsers;
	thumbnail: string;
	content: string;
	status: number;
	priority: string;
	category: string[];
	create_time: string;
	update_time: string;
}

export interface IgetPosts {
	page: number;
	limit: number;
}
export interface ICreatePosts {
	title: string;
	thumbnail?: string;
	content: string;
	priority: string;
	category: string[];
	_id: string;
}

export interface ICreateDraft {
	title: string;
	category: string[];
	thumbnail?: string;
	content: string;
}

export interface ISaveDraft extends ICreateDraft {
	draft_id: string;
}

export interface IChangePosts {
	news_id: string;
	title: string;
	description: string;
	content: string;
	thumbnail?: string;
	priority: number;
}

export interface IDeletePosts {
	news_id: string;
}
