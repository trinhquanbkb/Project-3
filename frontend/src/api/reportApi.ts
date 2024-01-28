import { api } from ".";
import { createAction } from "@reduxjs/toolkit";
import { IPagination } from "../models/pagination.model";
import { IReport } from "../models/report.model";

export const successToastAction = createAction<string>("toast/success");
export const failedToastAction = createAction<string>("toast/failed");
const ReportApi = api.injectEndpoints({
	endpoints: (build) => ({
		getReportList: build.query<
			{
				data: IReport[];
				paginations: IPagination;
			},
			any
		>({
			query: (params) => ({
				url: "reports",
				method: "GET",
				params,
			}),
			providesTags: [{ type: "Report", id: "List" }],
		}),
		createReport: build.mutation<any, { product_id: any; note: string }>({
			query: (data) => ({
				url: "reports",
				method: "POST",
				data,
			}),
			invalidatesTags: [{ type: "Report", id: "List" }],
		}),
	}),
});

export const { useGetReportListQuery, useCreateReportMutation } = ReportApi;
