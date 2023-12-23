import { api } from ".";
import { createAction } from "@reduxjs/toolkit";
import { IProductItem } from "../models/product.model";

export const successToastAction = createAction<string>("toast/success");
export const failedToastAction = createAction<string>("toast/failed");
const ProductItemApi = api.injectEndpoints({
	endpoints: (build) => ({
		searchProductItem: build.query<IProductItem, string>({
			query: (keyword) => ({
				url: `product_items/search/${keyword}`,
				method: "GET",
			}),
		}),
	}),
});

export const { useSearchProductItemQuery } = ProductItemApi;
