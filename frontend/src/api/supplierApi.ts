import { api } from ".";
import { createAction } from "@reduxjs/toolkit";
import { IPagination } from "../models/pagination.model";
import {
	ISupplier,
	IUpdateSupplier,
	ICreateSupplier,
} from "../models/supplier.model";

export const successToastAction = createAction<string>("toast/success");
export const failedToastAction = createAction<string>("toast/failed");
const SupplierApi = api.injectEndpoints({
	endpoints: (build) => ({
		getSupplierList: build.query<
			{
				data: ISupplier[];
				paginations: IPagination;
			},
			any
		>({
			query: (params) => ({
				url: "Suppliers",
				method: "GET",
				params,
			}),
			providesTags: [{ type: "Supplier", id: "List" }],
		}),
		getSupplierDetail: build.query<ISupplier, string>({
			query: (id) => ({
				url: `Suppliers/${id}`,
				method: "GET",
			}),
			providesTags: [{ type: "Supplier", id: "Detail" }],
		}),
		updateSupplier: build.mutation<
			any,
			{
				id: string;
				data: IUpdateSupplier;
			}
		>({
			query: ({ id, ...data }) => ({
				url: `Suppliers/${id}`,
				method: "PUT",
				...data,
			}),
			// invalidatesTags sẽ định nghĩa cho việc loading lại các api có tag là gì... (ở đây load lại api list và detail)
			invalidatesTags: [
				{ type: "Supplier", id: "List" },
				{ type: "Supplier", id: "Detail" },
			],
		}),
		deleteSupplier: build.mutation<any, string>({
			query: (id) => ({
				url: `Suppliers/${id}`,
				method: "DELETE",
			}),
			invalidatesTags: [{ type: "Supplier", id: "List" }],
		}),
		createSupplier: build.mutation<any, ICreateSupplier>({
			query: (data) => ({
				url: "suppliers",
				method: "POST",
				data,
			}),
			invalidatesTags: [{ type: "Supplier", id: "List" }],
		}),
	}),
});

export const {
	useGetSupplierListQuery,
	useGetSupplierDetailQuery,
	useUpdateSupplierMutation,
	useDeleteSupplierMutation,
	useCreateSupplierMutation,
} = SupplierApi;
