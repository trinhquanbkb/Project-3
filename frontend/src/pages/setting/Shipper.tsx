import { useEffect, useState } from "react";
import { Row, Col, Button, Form, Breadcrumb } from "react-bootstrap";
import queryString from "query-string";
import { useLocation } from "react-router-dom";
import TableShipper from "./component/TableShipper";
import {
	useDeleteShipperMutation,
	useGetShipperListQuery,
} from "../../api/shipperApi";
import { IShipperQuery } from "../../models/shipper.model";
import Loading from "../../components/Loading";
import ViewShipper from "./component/ViewShipper";
import NotFoundTable from "../../components/NotFoundTable";
import EditShipper from "./component/EditShipper";
import ModalConfirm from "../../components/ModalConfirm";
import { toast } from "react-toastify";
import CreateShipper from "./component/CreateShipper";

const listBreadCrumb = [
	{
		path: "/",
		label: "Home",
		active: false,
		icon: "uil-home-alt",
	},
	{
		path: "/",
		label: "Đối tác vận chuyển",
		active: true,
	},
];

const ShipperList = () => {
	const location = useLocation();
	const [idShipper, setIdShipper] = useState("");
	const [keywordShipperName, setKeywordShipperName] = useState("");
	const [viewModal, setViewModal] = useState(false);
	const [createModal, setCreateModal] = useState(false);
	const [editModal, setEditModal] = useState(false);
	const [deleteModal, setDeleteModal] = useState(false);
	const [search, setSearch] = useState<IShipperQuery>({
		page: 1,
		pageSize: 10,
		filter: {},
	});

	const { data: listShipper, isFetching } = useGetShipperListQuery({
		...search,
	});

	const [deleteShipperApi] = useDeleteShipperMutation();

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
				url: "shipping",
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

	const handleViewShipper = (id: string) => {
		setViewModal(!viewModal);
		setIdShipper(id);
	};

	const handleEditShipper = (id: string) => {
		setEditModal(!editModal);
		setIdShipper(id);
	};

	const handleDeleteShipper = (id: string) => {
		setDeleteModal(!deleteModal);
		setIdShipper(id);
	};

	const handleSearchOnEnter = (event: any) => {
		event.preventDefault();
		if (event.key === "Enter") {
			if (keywordShipperName.trim() === "") {
				setSearch({
					...search,
					filter: {},
				});
			} else {
				setSearch({
					...search,
					filter: {
						name: keywordShipperName.trim(),
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

	const apiDeleteShipper = async () => {
		const res: any = await deleteShipperApi(idShipper);
		if (res?.data) {
			setDeleteModal(!deleteModal);
			toast.success("Xóa đối tác vận chuyển thành công!");
		} else {
			toast.error("Xóa đối tác vận chuyển thất bại");
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
									<i className="uil-plus me-1"></i> Thêm đối
									tác vận chuyển
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
														setKeywordShipperName(
															e.target.value
														);
													}}
													value={keywordShipperName}
													onKeyUp={
														handleSearchOnEnter
													}
												/>
												<Button
													type="submit"
													className="btn-search"
													onClick={() => {
														if (
															keywordShipperName.trim() ===
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
																	name: keywordShipperName.trim(),
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
			) : listShipper ? (
				<TableShipper
					handleFilter={handleFilterPage}
					paginations={listShipper.paginations}
					handleViewShipper={handleViewShipper}
					handleEditShipper={handleEditShipper}
					handleDeleteShipper={handleDeleteShipper}
					data={
						listShipper
							? listShipper.data.map((item) => {
									return {
										id: item._id,
										name: item.name,
										address: item.address,
										phone: item.phone,
										email: item.email,
									};
							  })
							: null
					}
				/>
			) : (
				<NotFoundTable />
			)}

			{viewModal && (
				<ViewShipper
					isClass={"active"}
					id={idShipper}
					handleClose={handleClosePopup}
				/>
			)}

			{editModal && (
				<EditShipper
					isClass={"active"}
					id={idShipper}
					handleClose={handleClosePopup}
				/>
			)}

			{deleteModal && (
				<ModalConfirm
					show={deleteModal}
					content={`Xác nhận xóa đối tác vận chuyển?`}
					handleAction={apiDeleteShipper}
					onHide={() => setDeleteModal(false)}
				/>
			)}

			{createModal && (
				<CreateShipper
					isClass={"active"}
					handleClose={handleClosePopup}
				/>
			)}
		</>
	);
};

export default ShipperList;
