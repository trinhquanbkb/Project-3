export interface IWarehouse {
	_id: string;
	name: string;
	address: IAddress;
	createdAt: Date;
	updatedAt: Date;
	__v: any;
}

export interface IAddress {
	district: string;
	wards: string;
	city: string;
	address: string;
}
