import { useState } from "react";
import { Row, Col, Button, Form, Breadcrumb } from "react-bootstrap";
import { useGetProductListQuery } from "../../api/productApi";
import ItemProduct from "./Components/ItemProduct";
import PaginationSingle from "../../components/PaginationSingle";
import Loading from "../../components/Loading";
import { useHistory } from "react-router-dom";

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
	const [search, setSearch] = useState<any>({
		page: 1,
		pageSize: 20,
	});
	const { data: listProduct, isFetching } = useGetProductListQuery({
		...search,
	});

	const handlePagination = (page: number) => {
		setSearch({ ...search, page: page });
	};

	const handleViewModal = (id: string) => {
		history.push(`/inventory/${id}`);
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
								<Col xs={3}>
									<div className="col-left">
										<div className="input-search">
											<Form.Group className="form-search-user form-search-tracking">
												<Form.Control
													type="search"
													placeholder="Tìm kiếm theo tên sản phẩm"
												/>
												<Button
													type="submit"
													className="btn-search"
												></Button>
											</Form.Group>
										</div>
									</div>
								</Col>
							</Row>
						</div>
					</div>
				</Col>
			</Row>

			{listProduct ? (
				<div>
					<Row>
						{listProduct?.data.map((dt, index) => {
							return (
								<Col xs={4} lg={3} key={index}>
									<ItemProduct
										data={dt}
										handleView={handleViewModal}
									/>
								</Col>
							);
						})}
					</Row>

					<PaginationSingle
						page={search.page}
						handlePagination={handlePagination}
						totalPage={listProduct.paginations.totalPage}
						className="mt-2 mb-5"
					/>
				</div>
			) : (
				<Loading />
			)}
		</>
	);
};

export default UserList;
