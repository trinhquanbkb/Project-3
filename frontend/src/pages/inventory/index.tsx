import { useEffect, useState } from "react";
import { Row, Col, Button, Form, Breadcrumb } from "react-bootstrap";
import { useGetProductListQuery } from "../../api/productApi";
import Loading from "../../components/Loading";
import { useHistory, useLocation } from "react-router-dom";
import axios from "axios";
import queryString from "query-string";
import { getAccessToken } from "../../utils/getAccessToken";
import TableInventory from "./Components/TableInventory";
import { IProduct } from "../../models/product.model";

const listBreadCrumb = [
	{
		path: "/",
		label: "Home",
		active: false,
		icon: "uil-home-alt",
	},
	{
		path: "/",
		label: "Quản lý hàng tồn kho",
		active: true,
	},
];

const UserList = () => {
	const history = useHistory();
	const location = useLocation();
	const [keywordCode, setKeywordCode] = useState("");
	const [keywordName, setKeywordName] = useState("");
	const [search, setSearch] = useState<any>({
		page: 1,
		pageSize: 10,
	});
	const [filter, setFilter] = useState<{ code: string; name: string }>({
		code: "",
		name: "",
	});
	const { data: listProduct } = useGetProductListQuery({
		...search,
		filter: filter,
	});

	useEffect(() => {
		const query = location.search;
		const parsed = queryString.parse(query);
		const page = parsed.page ? Number(parsed.page) : 1;
		const pageSize = parsed.pageSize ? Number(parsed.pageSize) : 10;
		const code = parsed.code ? parsed.code.toString() : "";
		const name = parsed.name ? parsed.name.toString() : "";

		setSearch({
			...search,
			page,
			pageSize,
		});

		setFilter({ code: code, name: name });
		setKeywordCode(code);
		setKeywordName(name);
	}, []);

	// xử lý việc url thay đổi khi có filter
	useEffect(() => {
		const query = queryString.stringifyUrl(
			{
				url: "/inventory",
				query: {
					page: search.page,
					pageSize: search.pageSize,
					code: filter.code,
					name: filter.name,
				},
			},
			{
				skipEmptyString: true,
			}
		);
		window.history.pushState(null, "", query);
	}, [search, filter]);

	const handleViewModal = (id: string) => {
		history.push(`/inventory/${id}`);
	};

	const handleFilterPage = (filter: any) => {
		setSearch({
			...search,
			page: filter.page,
			pageSize: filter.pageSize,
		});
	};

	const handleExcel = async () => {
		try {
			const response = await axios.get(
				"http://localhost:3304/Products/excel",
				{
					responseType: "blob",
					headers: {
						Authorization: `Bearer ${getAccessToken()}`,
					},
				}
			);

			const blob = new Blob([response.data], {
				type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
			});

			const link = document.createElement("a");
			link.href = window.URL.createObjectURL(blob);
			link.download = "hang_ton_kho.xlsx";
			link.click();
		} catch (error) {
			console.error("Error downloading Excel file", error);
		}
	};

	return (
		<>
			<Row>
				<Col xs={12}>
					<div className="page-title-box">
						<div className="page-title-box-group">
							<Breadcrumb listProps={{ className: "m-0" }}>
								{(listBreadCrumb || []).map((item, index) => {
									return item.active ? (
										<Breadcrumb.Item active key={index}>
											{item.icon !== "" ? (
												<i
													className={`uil ${item.icon}`}
												></i>
											) : (
												""
											)}{" "}
											{item.label}
										</Breadcrumb.Item>
									) : (
										<Breadcrumb.Item
											key={index}
											href={item.path}
										>
											{item.icon !== "" ? (
												<i
													className={`uil ${item.icon}`}
												></i>
											) : (
												""
											)}{" "}
											{item.label}
										</Breadcrumb.Item>
									);
								})}
							</Breadcrumb>
						</div>
					</div>
				</Col>
			</Row>

			<hr className="mt-0" />

			<Row>
				<Col xs={12}>
					<div className="wrap-filter">
						<div className="list-input">
							<Row>
								<Col xs={6}>
									<Row>
										<Col xs={6}>
											<div className="col-left">
												<div className="input-search">
													<Form.Group className="form-search-user form-search-tracking">
														<Form.Control
															type="search"
															placeholder="Tìm kiếm theo mã danh mục"
															onChange={(e) => {
																setKeywordCode(
																	e.target
																		.value
																);
															}}
															onKeyUp={(e) => {
																if (
																	e.key ===
																	"Enter"
																) {
																	setFilter({
																		...filter,
																		code: keywordCode.trim(),
																	});
																}
															}}
														/>
														<Button
															className="btn-search"
															onClick={() => {
																setFilter({
																	...filter,
																	code: keywordCode.trim(),
																});
															}}
														></Button>
													</Form.Group>
												</div>
											</div>
										</Col>
										<Col xs={6}>
											<div className="col-left">
												<div className="input-search">
													<Form.Group className="form-search-user form-search-tracking">
														<Form.Control
															type="search"
															placeholder="Tìm kiếm theo tên sản phẩm"
															onChange={(e) => {
																setKeywordName(
																	e.target
																		.value
																);
															}}
															onKeyUp={(e) => {
																if (
																	e.key ===
																	"Enter"
																) {
																	setFilter({
																		...filter,
																		name: keywordName.trim(),
																	});
																}
															}}
														/>
														<Button
															className="btn-search"
															onClick={() => {
																setFilter({
																	...filter,
																	code: keywordName.trim(),
																});
															}}
														></Button>
													</Form.Group>
												</div>
											</div>
										</Col>
									</Row>
								</Col>
								<Col
									xs={6}
									className="d-flex justify-content-end"
								>
									<Button
										className="px-3 py-0"
										onClick={() => {
											handleExcel();
										}}
									>
										<i className="uil uil-download-alt"></i>{" "}
										Tải file excel
									</Button>
								</Col>
							</Row>
						</div>
					</div>
				</Col>
			</Row>

			{listProduct ? (
				<TableInventory
					handleFilter={handleFilterPage}
					paginations={listProduct.paginations}
					handleViewInventory={handleViewModal}
					data={
						listProduct
							? listProduct.data.map((item: IProduct) => {
									return {
										id: item._id,
										code: item._id,
										name: item.product_name,
										quantity: item.quantity,
										quantitySold: item.quantitySold,
										totalWeight: item.totalWeight,
									};
							  })
							: null
					}
				/>
			) : (
				<Loading />
			)}
		</>
	);
};

export default UserList;
