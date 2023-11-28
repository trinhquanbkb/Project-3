import { api } from ".";
import { createAction } from "@reduxjs/toolkit";
import { IPagination } from "../models/pagination.model";
import { IWarehouse } from "../models/warehouse.model";
import { IRole } from "../models/role.model";

export const successToastAction = createAction<string>("toast/success");
export const failedToastAction = createAction<string>("toast/failed");
const roleApi = api.injectEndpoints({
	endpoints: (build) => ({
		getRoleList: build.query<
			{
				data: IRole[];
				paginations: IPagination;
			},
			any
		>({
			query: (params) => ({
				url: "roles",
				method: "GET",
				params,
			}),
			providesTags: [{ type: "Role", id: "List" }],
		}),
	}),
});

export const { useGetRoleListQuery } = roleApi;
