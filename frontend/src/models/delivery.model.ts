import { ISupplier } from "./supplier.model";
import { IAddress, IWarehouse } from "./warehouse.model";

export interface IDelivery {
	_id: string;
	sender: string;
	receiver: string;
	products: IProductDelviery[];
	status: string;
	note: string;
	shipping_id: {
		_id: string;
		name: string;
		address: IAddress;
		phone: string;
		email: string;
		createdAt: string;
		updatedAt: string;
	};
	address: string;
	createdAt: string;
	updatedAt: string;
	tracking: string;
}

export interface IProductDelviery {
	product_id: {
		_id: string;
		product_name: string;
		url: string;
	};
	product_item: {
		product_item_id: {
			_id: string;
			expriry_data: string;
			quantity: number;
			weight: number;
			price: number;
			warehouse_id: IWarehouse;
			supplier_id: ISupplier;
			product_id: string;
			quantity_sold: number;
			hide: boolean;
			createdAt: string;
			updatedAt: string;
		};
		quantity: number;
		priceSold: number;
	}[];
}

export interface IDeliveryDetail {
	_id: string;
	sender: string;
	receiver: string;
	products: {
		product_id: {
			_id: string;
			product_name: string;
			url: string;
			createdAt: string;
			updatedAt: string;
		};
		product_item: {
			product_item_id: string;
			quantity: number;
			priceSold: number;
		}[];
	}[];
	status: string;
	note: string;
	shipping_id: string;
	address: string;
	createdAt: string;
	updatedAt: string;
}
