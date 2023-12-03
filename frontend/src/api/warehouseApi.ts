import { api } from ".";
import { createAction } from "@reduxjs/toolkit";
import { IPagination } from "../models/pagination.model";
import { 
	IWarehouse, 
	IWarehouseQuery,
	IUpdateWarehouse,
	ICreateWarehouse 
} from "../models/warehouse.model";

export const successToastAction = createAction<string>("toast/success");
export const failedToastAction = createAction<string>("toast/failed");
const warehouseApi = api.injectEndpoints({
	endpoints: (build) => ({
		getWarehouseList: build.query<
			{
				data: IWarehouse[];
				paginations: IPagination;
			},
			IWarehouseQuery
		>({
			query: (params) => ({
				url: "warehouses",
				method: "GET",
				params,
			}),
			providesTags: [{ type: "Warehouse", id: "List" }],
		}),
		getWarehouseDetail: build.query<IWarehouse, string>({
			query: (id) => ({
				url: `warehouses/${id}`,
				method: "GET",
			}),
			providesTags: [{ type: "Warehouse", id: "Detail" }],
		}),
		updateWarehouse: build.mutation<
			any,
			{
				id: string;
				data: IUpdateWarehouse;
			}
		>({
			query: ({ id, ...data }) => ({
				url: `warehouses/${id}`,
				method: "PUT",
				...data,
			}),
			// invalidatesTags sẽ định nghĩa cho việc loading lại các api có tag là gì... (ở đây load lại api list và detail)
			invalidatesTags: [
				{ type: "Warehouse", id: "List" },
				{ type: "Warehouse", id: "Detail" },
			],
		}),
		deleteWarehouse: build.mutation<any, string>({
			query: (id) => ({
				url: `warehouses/${id}`,
				method: "DELETE",
			}),
			invalidatesTags: [{ type: "Warehouse", id: "List" }],
		}),
		createWarehouse: build.mutation<any, ICreateWarehouse>({
			query: (data) => ({
				url: "warehouses",
				method: "POST",
				data,
			}),
			invalidatesTags: [{ type: "Warehouse", id: "List" }],
		})
	}),
});

export const {
	useGetWarehouseListQuery,
	useGetWarehouseDetailQuery,
	useUpdateWarehouseMutation,
	useDeleteWarehouseMutation,
	useCreateWarehouseMutation,
} = warehouseApi;
