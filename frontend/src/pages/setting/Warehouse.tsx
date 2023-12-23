import { useEffect, useState } from "react";
import { Row, Col, Button, Form, Breadcrumb } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import queryString from "query-string";

import TableWarehouse from "./component/TableWarehouse";
import {
	useDeleteWarehouseMutation,
	useGetWarehouseListQuery,
} from "../../api/warehouseApi";
import { IWarehouseQuery } from "../../models/warehouse.model";
import Loading from "../../components/Loading";
import ViewWarehouse from "./component/ViewWarehouse";
import NotFoundTable from "../../components/NotFoundTable";
import EditWarehouse from "./component/EditWarehouse";
import ModalConfirm from "../../components/ModalConfirm";
import { toast } from "react-toastify";
import CreateWarehouse from "./component/CreateWarehouse";

const listBreadCrumb = [
	{
		path: "/",
		label: "Home",
		active: false,
		icon: "uil-home-alt",
	},
	{
		path: "/",
		label: "Quản lý nhà kho",
		active: true,
	},
];

const WarehouseList = () => {
	const location = useLocation();
	const [idWarehouse, setIdWarehouse] = useState("");
	const [keywordWarehouseName, setKeywordWarehouseName] = useState("");
	const [viewModal, setViewModal] = useState(false);
	const [createModal, setCreateModal] = useState(false);
	const [editModal, setEditModal] = useState(false);
	const [deleteModal, setDeleteModal] = useState(false);
	const [search, setSearch] = useState<IWarehouseQuery>({
		page: 1,
		pageSize: 10,
		filter: {},
	});
	const { data: listWarehouse, isFetching } = useGetWarehouseListQuery({
		...search,
	});

	const [deleteWarehouseApi] = useDeleteWarehouseMutation();

	useEffect(() => {
		const query = location.search;
		const parsed = queryString.parse(query);

		const page = parsed.page ? Number(parsed.page) : 1;
		const pageSize = parsed.pageSize ? Number(parsed.pageSize) : 10;
		const filter = parsed.filter ? parsed.filter : {};

		setSearch({
			...search,
			page,
			pageSize,
			filter: filter,
		});
	}, []);

	// xử lý việc url thay đổi khi có filter
	useEffect(() => {
		const query = queryString.stringifyUrl(
			{
				url: "warehouse",
				query: {
					page: search.page,
					pageSize: search.pageSize,
					filter: JSON.stringify(search.filter),
				},
			},
			{
				skipEmptyString: true,
			}
		);
		window.history.pushState(null, "", query);
	}, [search]);

	// handle filter page with page and pageSize
	const handleFilterPage = (filter: any) => {
		setSearch({
			...search,
			page: filter.page,
			pageSize: filter.pageSize,
		});
	};

	const handleViewWarehouse = (id: string) => {
		setViewModal(!viewModal);
		setIdWarehouse(id);
	};

	const handleEditWarehouse = (id: string) => {
		setEditModal(!editModal);
		setIdWarehouse(id);
	};

	const handleDeleteWarehouse = (id: string) => {
		setDeleteModal(!deleteModal);
		setIdWarehouse(id);
	};

	const handleSearchOnEnter = (event: any) => {
		event.preventDefault();
		if (event.key === "Enter") {
			if (keywordWarehouseName.trim() === "") {
				setSearch({
					...search,
					filter: {},
				});
			} else {
				setSearch({
					...search,
					filter: {
						name: keywordWarehouseName.trim(),
					},
				});
			}
		}
	};

	const handleClosePopup = () => {
		if (viewModal) {
			setViewModal(!viewModal);
		}
		if (editModal) {
			setEditModal(!editModal);
		}
		if (deleteModal) {
			setDeleteModal(!deleteModal);
		}
		if (createModal) {
			setCreateModal(!createModal);
		}
	};

	const apiDeleteWarehouse = async () => {
		const res: any = await deleteWarehouseApi(idWarehouse);
		if (res?.data) {
			setDeleteModal(!deleteModal);
			toast.success("Xóa nhà kho thành công!");
		} else {
			toast.error("Xóa nhà kho thất bại");
		}
	};

	return (
		<>
			<Row>
				<Col xs={12}>
					<div className="page-title-box">
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
						<div className="page-title-right">
							<div className="mt-2 mt-md-0">
								<Button
									variant="primary"
									className="mb-2 mb-sm-0"
									onClick={() => {
										setCreateModal(!createModal);
									}}
								>
									<i className="uil-plus me-1"></i> Thêm nhà
									kho
								</Button>
							</div>
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
													placeholder="Tìm kiếm theo tên"
													onChange={(e) => {
														setKeywordWarehouseName(
															e.target.value
														);
													}}
													value={keywordWarehouseName}
													onKeyUp={
														handleSearchOnEnter
													}
												/>
												<Button
													type="submit"
													className="btn-search"
													onClick={() => {
														if (
															keywordWarehouseName.trim() ===
															""
														) {
															setSearch({
																...search,
																filter: {},
															});
														} else {
															setSearch({
																...search,
																filter: {
																	name: keywordWarehouseName.trim(),
																},
															});
														}
													}}
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

			{isFetching ? (
				<Loading />
			) : listWarehouse ? (
				<TableWarehouse
					handleFilter={handleFilterPage}
					paginations={listWarehouse.paginations}
					handleViewWarehouse={handleViewWarehouse}
					handleEditWarehouse={handleEditWarehouse}
					handleDeleteWarehouse={handleDeleteWarehouse}
					data={
						listWarehouse
							? listWarehouse.data.map((item) => {
									return {
										id: item._id,
										name: item.name,
										address: item.address,
									};
							  })
							: null
					}
				/>
			) : (
				<NotFoundTable />
			)}

			{viewModal && (
				<ViewWarehouse
					isClass={"active"}
					id={idWarehouse}
					handleClose={handleClosePopup}
				/>
			)}

			{editModal && (
				<EditWarehouse
					isClass={"active"}
					id={idWarehouse}
					handleClose={handleClosePopup}
				/>
			)}

			{deleteModal && (
				<ModalConfirm
					show={deleteModal}
					content={`Xác nhận xóa nhà kho?`}
					handleAction={apiDeleteWarehouse}
					onHide={() => setDeleteModal(false)}
				/>
			)}

			{createModal && (
				<CreateWarehouse
					isClass={"active"}
					handleClose={handleClosePopup}
				/>
			)}
		</>
	);
};

export default WarehouseList;
