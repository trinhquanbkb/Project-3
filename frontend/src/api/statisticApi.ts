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
		getTopRemainList: build.query({
			query: (top) => ({
				url: `top-product/top-product/${top}`,
				method: "GET",
			}),
			providesTags: [{ type: "Statistic", id: "TopRemain" }],
		}),
		getTopSoldList: build.query({
			query: (topInventory) => ({
				url: `top-product/top-inventory/${topInventory}`,
				method: "GET",
			}),
			providesTags: [{ type: "Statistic", id: "TopInventory" }],
		}),
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
	useGetTopRemainListQuery,
	useGetTopSoldListQuery,
} = statisticApi;
