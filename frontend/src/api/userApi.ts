import { api } from ".";
import { createAction } from "@reduxjs/toolkit";
import {
	ICreateUser,
	IUpdateUser,
	IUser,
	IUserQuery,
} from "../models/user.model";
import { IPagination } from "../models/pagination.model";

export const successToastAction = createAction<string>("toast/success");
export const failedToastAction = createAction<string>("toast/failed");
const userApi = api.injectEndpoints({
	endpoints: (build) => ({
		getUserList: build.query<
			{
				data: IUser[];
				paginations: IPagination;
			},
			IUserQuery
		>({
			query: (params) => ({
				url: "users",
				method: "GET",
				params,
			}),
			providesTags: [{ type: "User", id: "List" }],
		}),
		getUserDetail: build.query<IUser, string>({
			query: (id) => ({
				url: `users/${id}`,
				method: "GET",
			}),
			providesTags: [{ type: "User", id: "Detail" }],
		}),
		updateUser: build.mutation<
			any,
			{
				id: string;
				data: IUpdateUser;
			}
		>({
			query: ({ id, ...data }) => ({
				url: `users/${id}`,
				method: "PATCH",
				data,
			}),
			// invalidatesTags sẽ định nghĩa cho việc loading lại các api có tag là gì... (ở đây load lại api list và detail)
			invalidatesTags: [
				{ type: "User", id: "List" },
				{ type: "User", id: "Detail" },
			],
		}),
		deleteUser: build.mutation<any, string>({
			query: (id) => ({
				url: `users/${id}`,
				method: "DELETE",
			}),
			invalidatesTags: [{ type: "User", id: "List" }],
		}),
		createUser: build.mutation<any, ICreateUser>({
			query: (data) => ({
				url: `auth/sign-up`,
				method: "POST",
				data,
			}),
			invalidatesTags: [{ type: "User", id: "List" }],
		}),
	}),
});

export const {
	useGetUserListQuery,
	useGetUserDetailQuery,
	useUpdateUserMutation,
	useDeleteUserMutation,
	useCreateUserMutation,
} = userApi;
