import { api } from ".";
import { createAction } from "@reduxjs/toolkit";
import { IPagination } from "../models/pagination.model";
import { IWarehouse } from "../models/warehouse.model";

export const successToastAction = createAction<string>("toast/success");
export const failedToastAction = createAction<string>("toast/failed");
const warehouseApi = api.injectEndpoints({
	endpoints: (build) => ({
		getWarehouseList: build.query<
			{
				data: IWarehouse[];
				paginations: IPagination;
			},
			any
		>({
			query: (params) => ({
				url: "warehouses",
				method: "GET",
				params,
			}),
			providesTags: [{ type: "Warehouse", id: "List" }],
		}),
	}),
});

export const { useGetWarehouseListQuery } = warehouseApi;
