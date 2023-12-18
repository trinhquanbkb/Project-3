import React, { useEffect, useState } from "react";
import { Typeahead } from "react-bootstrap-typeahead";
import { useSearchProductQuery } from "../api/productApi";

interface OptionTypes {
	id: number;
	label: string;
}

interface IProps {
	handleChange?: any;
	handleKeyword?: any;
	id?: number;
	placeholder: string;
	className?: string;
	keywordId?: number | null;
	onChange?: any; // use for onChange of formik
}

export default function SearchProduct(props: IProps) {
	const [singleSelections, setSingleSelections] = useState<OptionTypes[]>([]);
	const [keyword, setKeyword] = useState<string>("");
	const [check, setCheck] = useState(true);
	const [optionProduct, setOptionProduct] = useState<any[]>();
	const { data: dataProduct } = useSearchProductQuery(keyword);
	const className = props.className ? props.className : "";

	useEffect(() => {
		if (!props.keywordId) {
			setSingleSelections([]);
		}
	}, [props.keywordId]);

	useEffect(() => {
		if (dataProduct) {
			let optionArr: any[] = [];
			let i = 0;
			dataProduct.forEach((item: any) => {
				if (item.product_name && i < 15) {
					optionArr.push({
						id: item._id,
						label: item.product_name,
					});
					i++;
				}
			});
			setOptionProduct(optionArr);
		}
	}, [dataProduct]);

	if (props.keywordId && dataProduct && check) {
		dataProduct.forEach((item: any) => {
			if (item.product_name !== null && item._id === props.keywordId) {
				setSingleSelections([
					{ id: item._id, label: item.product_name },
				]);
				props.handleKeyword(item._id, item.product_name);
			}
		});
		setCheck(false);
	}

	const onChangeSingleSelection = (selected: OptionTypes[]) => {
		setSingleSelections(selected);
		if (selected.length === 1) {
			// handleChange dùng khi cần nhiều input select cùng lúc
			if (props.handleChange) {
				props.handleChange(selected[0].id, props.id);
			}
			// handleKeyword dùng khi cần 1 input select
			if (props.handleKeyword) {
				props.handleKeyword(selected[0].id, selected[0].label);
			}
			// onChange dùng cho validate formik
			if (props.onChange) {
				props.onChange(selected[0].id);
			}
		} else if (selected.length === 0) {
			// handleChange dùng khi cần nhiều input select cùng lúc
			if (props.handleChange) {
				props.handleChange(null, props.id);
			}
			// handleKeyword dùng khi cần 1 input select
			if (props.handleKeyword) {
				props.handleKeyword(null, "");
			}
		}
		setCheck(true);
	};

	return (
		<div>
			<Typeahead
				className={className}
				id="select2"
				labelKey={"label"}
				multiple={false}
				onChange={(e: any) => {
					onChangeSingleSelection(e);
				}}
				onInputChange={(e) => {
					if (e === "") {
						// handleChange dùng khi cần nhiều input select cùng lúc
						if (props.handleChange) {
							props.handleChange(null, props.id);
						}
						// handleKeyword dùng khi cần 1 input select
						if (props.handleKeyword) {
							props.handleKeyword(null, "");
						}
						setKeyword("");
					} else {
						setKeyword(e);
					}
					setCheck(true);
				}}
				options={optionProduct || []}
				placeholder={props.placeholder}
				selected={singleSelections}
			/>
		</div>
	);
}
