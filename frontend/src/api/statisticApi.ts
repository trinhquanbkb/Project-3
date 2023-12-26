import { api } from ".";
import { createAction } from "@reduxjs/toolkit";

export const successToastAction = createAction<string>("toast/success");
export const failedToastAction = createAction<string>("toast/failed");
const statisticApi = api.injectEndpoints({
	endpoints: (build) => ({
		getRemainList: build.query<any, any>({
			query: () => ({
				url: "statistics",
				method: "GET",
			}),
			providesTags: [{ type: "Statistic", id: "List" }],
		}),
		// getWarehouseDetail: build.query({
		// 	query: (id) => ({
		// 		url: `warehouses/${id}`,
		// 		method: "GET",
		// 	}),
		// 	providesTags: [{ type: "Statistic", id: "Detail" }],
		// }),
		// deleteWarehouse: build.mutation<any, string>({
		// 	query: (id) => ({
		// 		url: `warehouses/${id}`,
		// 		method: "DELETE",
		// 	}),
		// 	invalidatesTags: [{ type: "Warehouse", id: "List" }],
		// })
	}),
});

export const {
	useGetRemainListQuery,
	// useGetWarehouseDetailQuery
} = statisticApi;
