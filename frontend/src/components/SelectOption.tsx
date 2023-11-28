import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import Select from "react-select";
import { OptionTypes } from "../models/util.model";

interface IProps {
	handleChange?: any;
	handleKeyword?: any;
	id?: any;
	placeholder?: string;
	className?: string;
	keywordId?: number | null;
	label: string;
	optionData: OptionTypes[];
}

export default function SelectOption(props: IProps) {
	const [idSelect, setIdSelect] = useState<any>();
	const className = props.className ? props.className : "";

	useEffect(() => {
		setIdSelect(props.id);
	}, [props.id]);

	const handleOption = (value: any) => {
		props.handleChange(value);
	};

	return (
		<div>
			<Form.Group className={className}>
				<Form.Label>{props.label}</Form.Label>
				<Select
					isClearable
					placeholder={props.placeholder}
					className="basic-single"
					classNamePrefix="select"
					isSearchable={true}
					value={{
						label: idSelect
							? props.optionData.find(
									(item) => item.value === idSelect
							  )?.label
							: null,
						value: idSelect,
					}}
					options={props.optionData}
					onChange={(e: any) => {
						if (e) {
							handleOption(e.value);
							setIdSelect(e.value);
						} else {
							handleOption(null);
							setIdSelect(null);
						}
					}}
				/>
			</Form.Group>
		</div>
	);
}
