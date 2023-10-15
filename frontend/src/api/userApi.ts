import { api } from ".";
import { createAction } from "@reduxjs/toolkit";

export const successToastAction = createAction<string>("toast/success");
export const failedToastAction = createAction<string>("toast/failed");
const userApi = api.injectEndpoints({
	endpoints: (build) => ({
		getUserList: build.query<any, void>({
			query: () => ({
				url: "api/users/list",
				method: "GET",
			}),
		}),
	}),
});

export const { useGetUserListQuery } = userApi;
