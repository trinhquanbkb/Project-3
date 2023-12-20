import { api } from ".";
import { createAction } from "@reduxjs/toolkit";
import { IPagination } from "../models/pagination.model";
import { 
	IShipper, 
	IShipperQuery,
	IUpdateShipper,
	ICreateShipper 
} from "../models/shipper.model";

export const successToastAction = createAction<string>("toast/success");
export const failedToastAction = createAction<string>("toast/failed");
const ShipperApi = api.injectEndpoints({
	endpoints: (build) => ({
		getShipperList: build.query<
			{
				data: IShipper[];
				paginations: IPagination;
			},
			IShipperQuery
		>({
			query: (params) => ({
				url: "Shippings",
				method: "GET",
				params,
			}),
			providesTags: [{ type: "Shipper", id: "List" }],
		}),
		getShipperDetail: build.query<IShipper, string>({
			query: (id) => ({
				url: `Shippings/${id}`,
				method: "GET",
			}),
			providesTags: [{ type: "Shipper", id: "Detail" }],
		}),
		updateShipper: build.mutation<
			any,
			{
				id: string;
				data: IUpdateShipper;
			}
		>({
			query: ({ id, ...data }) => ({
				url: `Shippings/${id}`,
				method: "PUT",
				...data,
			}),
			// invalidatesTags sẽ định nghĩa cho việc loading lại các api có tag là gì... (ở đây load lại api list và detail)
			invalidatesTags: [
				{ type: "Shipper", id: "List" },
				{ type: "Shipper", id: "Detail" },
			],
		}),
		deleteShipper: build.mutation<any, string>({
			query: (id) => ({
				url: `Shippings/${id}`,
				method: "DELETE",
			}),
			invalidatesTags: [{ type: "Shipper", id: "List" }],
		}),
		createShipper: build.mutation<any, ICreateShipper>({
			query: (data) => ({
				url: "Shippings",
				method: "POST",
				data,
			}),
			invalidatesTags: [{ type: "Shipper", id: "List" }],
		})
	}),
});

export const {
	useGetShipperListQuery,
	useGetShipperDetailQuery,
	useUpdateShipperMutation,
	useDeleteShipperMutation,
	useCreateShipperMutation,
} = ShipperApi;
