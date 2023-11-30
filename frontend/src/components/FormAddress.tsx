import React, { useEffect, useState } from "react";
import { getAddressApi } from "../api/addressApi";
import { Col, Form, Row } from "react-bootstrap";
import Select from "react-select";

export default function FormAddress() {
	const [listAddress, setListAddress] = useState<any>();
	const [optionSelectWard, setOptionSelectWard] = useState<any>();
	const [optionSelectDistrict, setOptionSelectDistrict] = useState<any>();
	const [dataSelect, setDataSelect] = useState({
		city: "",
		district: "",
		wards: "",
	});

	useEffect(() => {
		getAddressApi().then((res) => setListAddress(res));
	}, []);

	return (
		<div>
			{listAddress ? (
				<div>
					<Row>
						<Col xs={12} md={6}>
							<Form.Group className="mb-3">
								<Form.Label>Thành phố</Form.Label>
								<Select
									className="basic-single"
									classNamePrefix="select"
									isSearchable={true}
									options={listAddress.map((item: any) => {
										return {
											label: item.name,
											value: item.code,
										};
									})}
									onChange={(e: any) => {
										const itemSelect = listAddress.find(
											(item: any) => {
												return item.code === e.value;
											}
										);
										setOptionSelectDistrict(
											itemSelect.districts
										);
										setDataSelect({
											...dataSelect,
											city: e.label,
											wards: "",
											district: "",
										});
									}}
								/>
							</Form.Group>
						</Col>
						<Col xs={12} md={6}>
							<Form.Group className="mb-3">
								<Form.Label>Quận/Huyện</Form.Label>
								<Select
									className="basic-single"
									classNamePrefix="select"
									isSearchable={true}
									options={optionSelectDistrict?.map(
										(item: any) => {
											return {
												label: item.name,
												value: item.code,
											};
										}
									)}
									onChange={(e: any) => {
										const itemSelect =
											optionSelectDistrict?.find(
												(item: any) => {
													return (
														item.code === e.value
													);
												}
											);
										setOptionSelectWard(itemSelect.wards);
										setDataSelect({
											...dataSelect,
											district: e.label,
											wards: "",
										});
									}}
								/>
							</Form.Group>
						</Col>
						<Col xs={12} md={6}>
							<Form.Group className="mb-3">
								<Form.Label>Phường/Xã</Form.Label>
								<Select
									className="basic-single"
									classNamePrefix="select"
									isSearchable={true}
									options={optionSelectWard?.map(
										(item: any) => {
											return {
												label: item.name,
												value: item.code,
											};
										}
									)}
									onChange={(e: any) => {
										setDataSelect({
											...dataSelect,
											wards: e.label,
										});
									}}
								/>
							</Form.Group>
						</Col>
					</Row>
				</div>
			) : null}
		</div>
	);
}
