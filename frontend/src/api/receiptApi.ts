import { api } from ".";
import { createAction } from "@reduxjs/toolkit";
import { IPagination } from "../models/pagination.model";
import { IReceipt } from "../models/receipt.model";

export const successToastAction = createAction<string>("toast/success");
export const failedToastAction = createAction<string>("toast/failed");
const receiptApi = api.injectEndpoints({
	endpoints: (build) => ({
		getReceiptList: build.query<
			{
				data: IReceipt[];
				paginations: IPagination;
			},
			any
		>({
			query: (params) => ({
				url: "financial-transaction",
				method: "GET",
				params,
			}),
			providesTags: [{ type: "Receipt", id: "List" }],
		}),
	}),
});

export const { useGetReceiptListQuery } = receiptApi;
