import { api } from ".";
import { createAction } from "@reduxjs/toolkit";
import { IPagination } from "../models/pagination.model";
import { IProduct, IProductQuery } from "../models/product.model";

export const successToastAction = createAction<string>("toast/success");
export const failedToastAction = createAction<string>("toast/failed");
const ProductApi = api.injectEndpoints({
	endpoints: (build) => ({
		getProductList: build.query<
			{
				data: IProduct[];
				paginations: IPagination;
			},
			IProductQuery
		>({
			query: (params) => ({
				url: "Products",
				method: "GET",
				params,
			}),
			providesTags: [{ type: "Product", id: "List" }],
		}),
		getProductDetail: build.query<IProduct, string>({
			query: (id) => ({
				url: `Products/${id}`,
				method: "GET",
			}),
			providesTags: [{ type: "Product", id: "Detail" }],
		}),
		updateProduct: build.mutation<
			any,
			{
				id: string;
				data: any;
			}
		>({
			query: ({ id, ...data }) => ({
				url: `Products/${id}`,
				method: "PUT",
				...data,
			}),
			// invalidatesTags sẽ định nghĩa cho việc loading lại các api có tag là gì... (ở đây load lại api list và detail)
			invalidatesTags: [
				{ type: "Product", id: "List" },
				{ type: "Product", id: "Detail" },
			],
		}),
		deleteProduct: build.mutation<any, string>({
			query: (id) => ({
				url: `Products/${id}`,
				method: "DELETE",
			}),
			invalidatesTags: [{ type: "Product", id: "List" }],
		}),
		createProduct: build.mutation<any, any>({
			query: (data) => ({
				url: "Products",
				method: "POST",
				data,
			}),
			invalidatesTags: [{ type: "Product", id: "List" }],
		}),
		searchProduct: build.query<IProduct[], string>({
			query: (keyword) => ({
				url: `Products/search/${keyword}`,
				method: "GET",
			}),
		}),
		exportExcel: build.mutation<any, void>({
			query: () => ({
				url: `Products/excel`,
				method: "POST",
			}),
		}),
	}),
});

export const {
	useGetProductListQuery,
	useGetProductDetailQuery,
	useUpdateProductMutation,
	useDeleteProductMutation,
	useCreateProductMutation,
	useSearchProductQuery,
	useExportExcelMutation,
} = ProductApi;
