import { api } from ".";
import { createAction } from "@reduxjs/toolkit";
import { IPagination } from "../models/pagination.model";
import {
	IReceipt,
	IReceiptQuery,
	IUpdateReceipt,
	ICreateReceipt,
} from "../models/receipt.model";

export const successToastAction = createAction<string>("toast/success");
export const failedToastAction = createAction<string>("toast/failed");
const ReceiptApi = api.injectEndpoints({
	endpoints: (build) => ({
		getReceiptList: build.query<
			{
				data: IReceipt[];
				paginations: IPagination;
			},
			IReceiptQuery
		>({
			query: (params) => ({
				url: "financial-transaction",
				method: "GET",
				params,
			}),
			providesTags: [{ type: "Receipt", id: "List" }],
		}),
		getReceiptDetail: build.query<IReceipt, string>({
			query: (id) => ({
				url: `financial-transaction/${id}`,
				method: "GET",
			}),
			providesTags: [{ type: "Receipt", id: "Detail" }],
		}),
		updateReceipt: build.mutation<
			any,
			{
				id: string;
				data: IUpdateReceipt;
			}
		>({
			query: ({ id, ...data }) => ({
				url: `financial-transaction/${id}`,
				method: "PUT",
				...data,
			}),
			// invalidatesTags sẽ định nghĩa cho việc loading lại các api có tag là gì... (ở đây load lại api list và detail)
			invalidatesTags: [
				{ type: "Receipt", id: "List" },
				{ type: "Receipt", id: "Detail" },
			],
		}),
		deleteReceipt: build.mutation<any, string>({
			query: (id) => ({
				url: `financial-transaction/${id}`,
				method: "DELETE",
			}),
			invalidatesTags: [{ type: "Receipt", id: "List" }],
		}),
		createReceipt: build.mutation<any, ICreateReceipt>({
			query: (data) => ({
				url: "financial-transaction",
				method: "POST",
				data,
			}),
			invalidatesTags: [
				{ type: "Receipt", id: "List" },
				{ type: "Receipt", id: "Detail" },
			],
		}),
	}),
});

export const {
	useGetReceiptListQuery,
	useGetReceiptDetailQuery,
	useUpdateReceiptMutation,
	useDeleteReceiptMutation,
	useCreateReceiptMutation,
} = ReceiptApi;
