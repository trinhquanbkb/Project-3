import { api } from ".";
import { createAction } from "@reduxjs/toolkit";
import { IDelivery, IDeliveryDetail } from "../models/delivery.model";
import { IPagination } from "../models/pagination.model";

export const successToastAction = createAction<string>("toast/success");
export const failedToastAction = createAction<string>("toast/failed");
const DeliveryBillApi = api.injectEndpoints({
	endpoints: (build) => ({
		getDeliveryBillList: build.query<
			{
				data: IDelivery[];
				paginations: IPagination;
			},
			any
		>({
			query: (params) => ({
				url: "orders",
				method: "GET",
				params,
			}),
			providesTags: [{ type: "DeliveryBill", id: "List" }],
		}),
		getDeliveryBillDetail: build.query<IDeliveryDetail, string>({
			query: (id) => ({
				url: `orders/${id}`,
				method: "GET",
			}),
			providesTags: [{ type: "DeliveryBill", id: "Detail" }],
		}),
		createDeliveryBill: build.mutation<
			any,
			{
				sender: string;
				receiver: string;
				products: {
					product_id: string;
					product_item: {
						product_item_id: string;
						quantity: number;
						priceSold: number;
					}[];
				}[];
				address: string;
				note: string;
			}
		>({
			query: (data) => ({
				url: `orders`,
				method: "POST",
				data,
			}),
			invalidatesTags: [
				{ type: "DeliveryBill", id: "List" },
				{ type: "DeliveryBill", id: "Detail" },
			],
		}),
		waitingDeliveryBill: build.mutation<any, string>({
			query: (id) => ({
				url: `orders/waiting_for_delivery/${id}`,
				method: "POST",
			}),
			invalidatesTags: [
				{ type: "DeliveryBill", id: "List" },
				{ type: "DeliveryBill", id: "Detail" },
			],
		}),
		exportDeliveryBill: build.mutation<any, any>({
			query: ({ id, ...data }) => ({
				url: `orders/approve/${id}`,
				method: "POST",
				data,
			}),
			invalidatesTags: [
				{ type: "DeliveryBill", id: "List" },
				{ type: "DeliveryBill", id: "Detail" },
			],
		}),
		cancelDeliveryBill: build.mutation<any, string>({
			query: (id) => ({
				url: `orders/cancel/${id}`,
				method: "POST",
			}),
			invalidatesTags: [
				{ type: "DeliveryBill", id: "List" },
				{ type: "DeliveryBill", id: "Detail" },
			],
		}),
	}),
});

export const {
	useCreateDeliveryBillMutation,
	useGetDeliveryBillListQuery,
	useGetDeliveryBillDetailQuery,
	useCancelDeliveryBillMutation,
	useExportDeliveryBillMutation,
	useWaitingDeliveryBillMutation,
} = DeliveryBillApi;
