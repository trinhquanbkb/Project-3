import { useEffect, useState } from "react";
import { Row, Col, Button, Form, Breadcrumb } from "react-bootstrap";
import queryString from "query-string";

import TableSupplier from "./component/TableSupplier";
import {
	useDeleteSupplierMutation,
	useGetSupplierListQuery,
} from "../../api/supplierApi";
import { ISupplierQuery, IAddress } from "../../models/supplier.model";
import Loading from "../../components/Loading";
import ViewSupplier from "./component/ViewSupplier";
import NotFoundTable from "../../components/NotFoundTable";
import EditSupplier from "./component/EditSupplier";
import ModalConfirm from "../../components/ModalConfirm";
import { toast } from "react-toastify";
import CreateSupplier from "./component/CreateSupplier";
import { useLocation } from "react-router-dom";

const listBreadCrumb = [
	{
		path: "/",
		label: "Home",
		active: false,
		icon: "uil-home-alt",
	},
	{
		path: "/",
		label: "Quản lý đối tác kinh doanh",
		active: true,
	},
];

const SupplierList = () => {
	// const location = useLocation();
	const [idSupplier, setIdSupplier] = useState("");
	const [keywordSupplierName, setKeywordSupplierName] = useState("");
	const [viewModal, setViewModal] = useState(false);
	const [createModal, setCreateModal] = useState(false);
	const [editModal, setEditModal] = useState(false);
	const [deleteModal, setDeleteModal] = useState(false);
	const [search, setSearch] = useState<ISupplierQuery>({
		page: 1,
		pageSize: 10,
		filter: {},
	});

	const { data: listSupplier, isFetching } = useGetSupplierListQuery({
		...search,
	});

	const [deleteSupplierApi] = useDeleteSupplierMutation();
	const location = useLocation();

	useEffect(() => {
		const query = location.search;
		const parsed = queryString.parse(query);
		const page = parsed.page ? Number(parsed.page) : 1;
		const pageSize = parsed.pageSize ? Number(parsed.pageSize) : 10;
		const filter = parsed.filter ? parsed.filter : {};
		// const address = parsed.address ? parsed.address : "";

		setSearch({
			...search,
			page,
			pageSize,
			filter,
		});
	}, []);

	// xử lý việc url thay đổi khi có filter
	useEffect(() => {
		const query = queryString.stringifyUrl(
			{
				url: "/suppliers",
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

	const handleViewSupplier = (id: string) => {
		setViewModal(!viewModal);
		setIdSupplier(id);
	};

	const handleEditSupplier = (id: string) => {
		setEditModal(!editModal);
		setIdSupplier(id);
	};

	const handleDeleteSupplier = (id: string) => {
		setDeleteModal(!deleteModal);
		setIdSupplier(id);
	};

	const handleSearchOnEnter = (event: any) => {
		event.preventDefault();
		if (event.key === "Enter") {
			if (keywordSupplierName.trim() === "") {
				setSearch({
					...search,
					filter: {},
				});
			} else {
				setSearch({
					...search,
					filter: {
						name: keywordSupplierName.trim(),
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

	const apiDeleteSupplier = async () => {
		const res: any = await deleteSupplierApi(idSupplier);
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
														setKeywordSupplierName(
															e.target.value
														);
													}}
													value={keywordSupplierName}
													onKeyUp={
														handleSearchOnEnter
													}
												/>
												<Button
													type="submit"
													className="btn-search"
													onClick={() => {
														setSearch({
															...search,
															filter: {
																name: keywordSupplierName.trim(),
															},
														});
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
			) : listSupplier ? (
				<TableSupplier
					handleFilter={handleFilterPage}
					paginations={listSupplier.paginations}
					handleViewSupplier={handleViewSupplier}
					handleEditSupplier={handleEditSupplier}
					handleDeleteSupplier={handleDeleteSupplier}
					data={
						listSupplier
							? listSupplier.data.map((item) => {
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
				<ViewSupplier
					isClass={"active"}
					id={idSupplier}
					handleClose={handleClosePopup}
				/>
			)}

			{editModal && (
				<EditSupplier
					isClass={"active"}
					id={idSupplier}
					handleClose={handleClosePopup}
				/>
			)}

			{deleteModal && (
				<ModalConfirm
					show={deleteModal}
					content={`Xác nhận xóa nhà kho?`}
					handleAction={apiDeleteSupplier}
					onHide={() => setDeleteModal(false)}
				/>
			)}

			{createModal && (
				<CreateSupplier
					isClass={"active"}
					handleClose={handleClosePopup}
				/>
			)}
		</>
	);
};

export default SupplierList;
