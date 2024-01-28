import React from "react";
import { useGetWarehouseListQuery } from "../../api/warehouseApi";
import SelectOption from "../SelectOption";
import { OptionTypes } from "../../models/util.model";

interface IProps {
	id: any;
	handleChange: any;
	isLabel?: boolean;
}

export default function SelectWarehouse(props: IProps) {
	const { data, isFetching } = useGetWarehouseListQuery({
		page: 1,
		pageSize: 100,
		filter: "",
	});

	let optionWarehouse: OptionTypes[] = [];
	optionWarehouse.push({ value: null, label: "Chọn" });
	if (data) {
		data.data.forEach((item) => {
			optionWarehouse.push({
				value: item._id,
				label:
					item.name +
					` (${item.address.district}-${item.address.wards}-${item.address.city})`,
			});
		});
	}

	const handleChangeWarehouse = (id: any) => {
		props.handleChange(id);
	};

	return (
		<div>
			<SelectOption
				id={props.id ? props.id : null}
				label="Kho"
				handleChange={handleChangeWarehouse}
				optionData={optionWarehouse}
				isLabel={props.isLabel}
			/>
		</div>
	);
}
