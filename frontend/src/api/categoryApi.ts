import { api } from ".";
import { createAction } from "@reduxjs/toolkit";
import { IPagination } from "../models/pagination.model";
import {
	ICategory,
	ICategoryQuery,
	IUpdateCategory,
	ICreateCategory,
} from "../models/category.model";

export const successToastAction = createAction<string>("toast/success");
export const failedToastAction = createAction<string>("toast/failed");
const CategoryApi = api.injectEndpoints({
	endpoints: (build) => ({
		getCategoryList: build.query<
			{
				data: ICategory[];
				paginations: IPagination;
			},
			any
		>({
			query: (params) => ({
				url: "Products",
				method: "GET",
				params,
			}),
			providesTags: [{ type: "Category", id: "List" }],
		}),
		getCategoryDetail: build.query<ICategory, string>({
			query: (id) => ({
				url: `Products/${id}`,
				method: "GET",
			}),
			providesTags: [{ type: "Category", id: "Detail" }],
		}),
		updateCategory: build.mutation<
			any,
			{
				id: string;
				data: IUpdateCategory;
			}
		>({
			query: ({ id, ...data }) => ({
				url: `Products/${id}`,
				method: "PUT",
				...data,
			}),
			// invalidatesTags sẽ định nghĩa cho việc loading lại các api có tag là gì... (ở đây load lại api list và detail)
			invalidatesTags: [
				{ type: "Category", id: "List" },
				{ type: "Category", id: "Detail" },
			],
		}),
		deleteCategory: build.mutation<any, string>({
			query: (id) => ({
				url: `Products/${id}`,
				method: "DELETE",
			}),
			invalidatesTags: [{ type: "Category", id: "List" }],
		}),
		createCategory: build.mutation<any, ICreateCategory>({
			query: (data) => ({
				url: "Products",
				method: "POST",
				data,
			}),
			invalidatesTags: [{ type: "Category", id: "List" }],
		}),
	}),
});

export const {
	useGetCategoryListQuery,
	useGetCategoryDetailQuery,
	useUpdateCategoryMutation,
	useDeleteCategoryMutation,
	useCreateCategoryMutation,
} = CategoryApi;
