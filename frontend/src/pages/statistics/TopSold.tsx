import React, { useEffect, useState } from "react";
import { Row, Col, Form } from "react-bootstrap";
import Loading from "../../components/Loading";

import BarChart from "./BarChart";
import queryString from "query-string";
import { useGetTopSoldListQuery } from "../../api/statisticApi";
import { useLocation } from "react-router-dom";

const TopSoldList = () => {
	const [isChatInitilized, setIsChatInitilized] = useState<boolean>(false);
	const [search, setSearch] = useState(10);
	const location = useLocation();

	const { data, isFetching } = useGetTopSoldListQuery(search);

	const convertValue = (data: any) => {
		const productNames: any = [];
		const total_solds: any = [];
		data.forEach((product: any) => {
			productNames.push(product.product_name);
			total_solds.push(product.total_sold);
		});
		return {
			productNames,
			total_solds,
		};
	};

	useEffect(() => {
		const query = location.search;
		const parsed = queryString.parse(query);
	}, []);

	useEffect(() => {
		// set deafult config of apex chart
		if ((window as any).Apex) {
			(window as any).Apex = {
				chart: {
					parentHeightOffset: 0,
					toolbar: {
						show: false,
					},
				},
				grid: {
					padding: {
						left: 20,
						right: 0,
					},
				},
				colors: [
					"#5369F8",
					"#43D39E",
					"#F77E53",
					"#1CE1AC",
					"#25C2E3",
					"#FFBE0B",
				],
				tooltip: {
					theme: "dark",
					x: { show: false },
				},
				dataLabels: {
					enabled: false,
				},
				xaxis: {
					axisBorder: {
						color: "#D6DDEA",
					},
					axisTicks: {
						color: "#D6DDEA",
					},
				},
				yaxis: {
					labels: {
						offsetX: -5,
					},
				},
			};
			setIsChatInitilized(true);
		}
		return () => {
			if ((window as any).Apex) {
				(window as any).Apex = {};
			}
		};
	}, []);

	return (
		<>
			<Row className="mt-3">
				<Col xs={3}>
					<div className="wrap-filter">
						Chọn số lượng sản phẩm muốn hiển thị
						<Form.Select
							className="w-50 mt-1"
							aria-label="Default select example"
							value={search}
							onChange={(e) => {
								setSearch(parseInt(e.currentTarget.value));
							}}
						>
							<option value="5">5</option>
							<option value="10">10</option>
							<option value="15">15</option>
							<option value="20">20</option>
							<option value="25">25</option>
						</Form.Select>
					</div>
				</Col>
			</Row>
			<React.Fragment>
				{isFetching ? (
					<Loading />
				) : (
					<>
						<Row>
							<Col xl={20}>
								{/* {console.log(data)} */}
								<BarChart
									basicBarChartData={
										convertValue(data).total_solds
									}
									showLoader={!isChatInitilized}
									name={"Các sản phẩm bán chạy nhất"}
									categories={convertValue(data).productNames}
								/>
							</Col>
						</Row>
					</>
				)}
			</React.Fragment>
		</>
	);
};

export default TopSoldList;
