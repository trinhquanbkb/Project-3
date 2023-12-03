import React, { useEffect, useState } from "react";
import { getAddressApi } from "../api/addressApi";
import { Col, Form, Row } from "react-bootstrap";
import Select from "react-select";

export default function FormAddress({
	city,
	district,
	wards,
	onCityChange,
	onDistrictChange,
	onWardsChange,
}: {
	city: string;
	district: string;
	wards: string;
	onCityChange: (value: any) => void;
	onDistrictChange: (value: any) => void;
	onWardsChange: (value: any) => void;
}) {
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


	const getDistrictOptions = () => {
		const selectedCity = listAddress.find((city: any) => city.name === dataSelect.city);
		if (selectedCity) {
			return selectedCity.districts.map((district: any) => ({
				label: district.name,
				value: district.code,
			}));
		}

		if (city) {
			const cityFromProps = listAddress.find((item: any) => item.name === city);
			if (cityFromProps) {
				return cityFromProps.districts.map((district: any) => ({
					label: district.name,
					value: district.code,
				}));
			}
		}

		return [];
	};

	const getWardsOptions = () => {
		const selectedCity = listAddress.find((city: any) => city.name === dataSelect.city);
		const selectedDistrict = selectedCity?.districts?.find((district: any) => district.name === dataSelect.district);		
		if (selectedDistrict) {
			return selectedDistrict.wards.map((ward: any) => ({
				label: ward.name,
				value: ward.code,
			}));
		}

		if (district) {
			const cityFromProps = listAddress.find((item: any) => item.name === city);
			const districtFromProps = cityFromProps.districts.find((item: any) => item.name === district);
			if (districtFromProps) {
				return districtFromProps.wards.map((ward: any) => ({
					label: ward.name,
					value: ward.code,
				}));
			}
		}

		return [];
	};


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
									options={listAddress.map((item: any) => ({
										label: item.name,
										value: item.code,
									}))}
									value={{
										label: city, // Assuming city is a string
										value: listAddress.find((item: any) => item.name === city)?.code,
									}}
									onChange={(e: any) => {
										const itemSelect = listAddress.find(
											(item: any) => item.code === e.value
										);
										setOptionSelectDistrict(itemSelect.districts);
										onCityChange(e.label);
										onDistrictChange("");
										onWardsChange("");
										setDataSelect({
											...dataSelect,
											city: e.label,
											district: "",
											wards: "",
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
									options={getDistrictOptions()}
									value={{
										label: district, // Assuming district is a string
										value: optionSelectDistrict?.find((item: any) => item.name === district)?.code,
									}}
									onChange={(e: any) => {
										const selectedDistrict = optionSelectDistrict?.find((item: any) => item.name === e.label);
										setOptionSelectWard(selectedDistrict?.wards || []);
										onDistrictChange(e.label);
										onWardsChange("");
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
									options={getWardsOptions()}
									value={{
										label: wards, // Assuming wards is a string
										value: optionSelectWard?.find((item: any) => item.name === wards)?.code,
									}}
									onChange={(e: any) => {
										onWardsChange(e.label);
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
