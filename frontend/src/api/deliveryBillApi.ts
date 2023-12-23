import { api } from ".";
import { createAction } from "@reduxjs/toolkit";

export const successToastAction = createAction<string>("toast/success");
export const failedToastAction = createAction<string>("toast/failed");
const DeliveryBillApi = api.injectEndpoints({
	endpoints: (build) => ({
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
	}),
});

export const { useCreateDeliveryBillMutation } = DeliveryBillApi;
