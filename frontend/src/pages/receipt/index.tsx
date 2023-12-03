import React, { useEffect, useState } from "react";
import { Row, Col, Button, Form, Breadcrumb } from "react-bootstrap";
import queryString from "query-string";

//dummy data
import { useLocation } from "react-router-dom";
import Loading from "../../components/Loading";
import NotFoundTable from "../../components/NotFoundTable";
import ModalConfirm from "../../components/ModalConfirm";
import { toast } from "react-toastify";
import { IReceiptQuery } from "../../models/receipt.model";
import { useGetReceiptListQuery } from "../../api/receiptApi";
import TableReceipt from "./component/TableReceipt";
import EditReceipt from "./component/EditReceipt";
import CreateReceipt from "./component/CreateReceipt";
import ViewReceipt from "./component/ViewReceipt";

const listBreadCrumb = [
	{
		path: "/",
		label: "Home",
		active: false,
		icon: "uil-home-alt",
	},
	{
		path: "/",
		label: "Phiếu nhập kho",
		active: true,
	},
];

const ReceiptList = () => {
	const location = useLocation();
	const [idUser, setIdUser] = useState("");
	const [viewModal, setViewModal] = useState(false);
	const [createModal, setCreateModal] = useState(false);
	const [editModal, setEditModal] = useState(false);
	const [deleteModal, setDeleteModal] = useState(false);
	const [search, setSearch] = useState<IReceiptQuery>({
		page: 1,
		pageSize: 10,
	});
	const { data: listReceipt, isFetching } = useGetReceiptListQuery({
		...search,
	});

	useEffect(() => {
		const query = location.search;
		const parsed = queryString.parse(query);
		const page = parsed.page ? Number(parsed.page) : 1;
		const pageSize = parsed.pageSize ? Number(parsed.pageSize) : 10;

		setSearch({
			...search,
			page,
			pageSize,
		});
	}, []);

	// xử lý việc url thay đổi khi có filter
	useEffect(() => {
		const query = queryString.stringifyUrl(
			{
				url: "/receipt",
				query: {
					page: search.page,
					pageSize: search.pageSize,
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

	const handleViewReceipt = (id: string) => {
		setViewModal(!viewModal);
		setIdUser(id);
	};

	const handleEditReceipt = (id: string) => {
		setEditModal(!editModal);
		setIdUser(id);
	};

	const handleDeleteReceipt = (id: string) => {
		setDeleteModal(!deleteModal);
		setIdUser(id);
	};

	const handleSearchOnEnter = (event: any) => {
		event.preventDefault();
		if (event.key === "Enter") {
			setSearch({
				...search,
			});
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

	const apiDeleteUser = async () => {
		// const res: any = await deleteUserApi(idUser);
		// if (res?.data) {
		// 	setDeleteModal(!deleteModal);
		// 	toast.success("Xóa nhân sự thành công!");
		// } else {
		// 	toast.error("Xóa nhân sự thất bại");
		// }
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
									<i className="uil-plus me-1"></i> Nhập phiếu
									nhập kho
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
													placeholder="Tìm kiếm mã phiếu nhập kho"
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

			{isFetching ? (
				<Loading />
			) : listReceipt ? (
				<TableReceipt
					handleFilter={handleFilterPage}
					paginations={listReceipt.paginations}
					handleViewReceipt={handleViewReceipt}
					handleEditReceipt={handleEditReceipt}
					handleDeleteReceipt={handleDeleteReceipt}
					data={
						listReceipt
							? listReceipt.data.map((item) => {
									return {
										id: item._id,
										supplierId: item.supplierId,
										quantity: item.products.length,
										weight: item.weight,
										note: item.note,
										warehouseId: item?.warehouseId,
									};
							  })
							: null
					}
				/>
			) : (
				<NotFoundTable />
			)}

			{viewModal && (
				<ViewReceipt
					isClass={"active"}
					id={idUser}
					handleClose={handleClosePopup}
				/>
			)}

			{editModal && (
				<EditReceipt
					isClass={"active"}
					id={idUser}
					handleClose={handleClosePopup}
				/>
			)}

			{deleteModal && (
				<ModalConfirm
					show={deleteModal}
					content={`Xác nhận xóa nhân viên?`}
					handleAction={apiDeleteUser}
					onHide={() => setDeleteModal(false)}
				/>
			)}

			{createModal && (
				<CreateReceipt
					isClass={"active"}
					handleClose={handleClosePopup}
				/>
			)}
		</>
	);
};

export default ReceiptList;
