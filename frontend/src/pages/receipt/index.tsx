import React, { useEffect, useState } from "react";
import { Row, Col, Button, Form, Breadcrumb } from "react-bootstrap";
import queryString from "query-string";

//dummy data
import { useLocation } from "react-router-dom";
import Loading from "../../components/Loading";
import NotFoundTable from "../../components/NotFoundTable";
import { toast } from "react-toastify";
import { IReceiptQuery } from "../../models/receipt.model";
import {
	useApproveReceiptMutation,
	useCancelReceiptMutation,
	useGetReceiptListQuery,
} from "../../api/receiptApi";
import TableReceipt from "./component/TableReceipt";
import CreateReceipt from "./component/CreateReceipt";
import ViewReceipt from "./component/ViewReceipt";
import ModalApprove from "./component/ModalApprove";
import { convertDate } from "../../utils/function";

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
	const [id, setId] = useState("");
	const [keywordCode, setKeywordCode] = useState("");
	const [buttonDisabled, setButtonDisabled] = useState(false);
	const [viewModal, setViewModal] = useState(false);
	const [createModal, setCreateModal] = useState(false);
	const [editModal, setEditModal] = useState(false);
	const [deleteModal, setDeleteModal] = useState(false);
	const [approveModal, setApproveModal] = useState(false);
	const [approveApi] = useApproveReceiptMutation();
	const [cancelApi] = useCancelReceiptMutation();
	const [search, setSearch] = useState<IReceiptQuery>({
		page: 1,
		pageSize: 10,
	});
	const [filter, setFilter] = useState({ code: "" });
	const { data: listReceipt, isFetching } = useGetReceiptListQuery({
		...search,
		filter: filter,
	});

	useEffect(() => {
		const query = location.search;
		const parsed = queryString.parse(query);
		const page = parsed.page ? Number(parsed.page) : 1;
		const pageSize = parsed.pageSize ? Number(parsed.pageSize) : 10;
		const code = parsed.code ? parsed.code.toString() : "";

		setSearch({
			...search,
			page,
			pageSize,
		});

		setFilter({ code: code });
		setKeywordCode(code);
	}, []);

	// xử lý việc url thay đổi khi có filter
	useEffect(() => {
		const query = queryString.stringifyUrl(
			{
				url: "/receipt",
				query: {
					page: search.page,
					pageSize: search.pageSize,
					code: filter.code,
				},
			},
			{
				skipEmptyString: true,
			}
		);
		window.history.pushState(null, "", query);
	}, [search, filter]);

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
		setId(id);
	};

	const handleEditReceipt = (id: string) => {
		setEditModal(!editModal);
		setId(id);
	};

	const handleDeleteReceipt = (id: string) => {
		setDeleteModal(!deleteModal);
		setId(id);
	};

	const handleApproveReceipt = (id: string) => {
		setApproveModal(!approveModal);
		setId(id);
	};

	const handleClick = () => {
		if (!buttonDisabled) {
			setButtonDisabled(true);
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
		if (approveModal) {
			setApproveModal(!approveModal);
		}
	};

	const fetchApprove = async () => {
		const res = await approveApi(id);
		if (res) {
			toast.success("Duyệt phiếu thành công!");
			setApproveModal(!approveModal);
			setButtonDisabled(false);
		} else {
			toast.error("Lỗi duyệt phiếu!");
			setButtonDisabled(false);
		}
	};

	const fetchCancel = async () => {
		const res = await cancelApi(id);
		if (res) {
			toast.success("Hủy phiếu thành công!");
			setApproveModal(!approveModal);
			setButtonDisabled(false);
		} else {
			toast.error("Lỗi hủy phiếu!");
			setButtonDisabled(false);
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
													value={keywordCode}
													onChange={(e) => {
														setKeywordCode(
															e.target.value
														);
													}}
													onKeyUp={(e) => {
														if (e.key === "Enter") {
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
					handleApproveReceipt={handleApproveReceipt}
					data={
						listReceipt
							? listReceipt.data.map((item) => {
									return {
										id: item._id,
										supplierId: item.supplierId.name,
										quantity: item.products.length,
										weight: item.weight,
										note: item.note,
										warehouseId: item?.warehouseId.name,
										createdAt: convertDate(item.createdAt),
										status: item.status,
										statusCss: item.status,
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
					id={id}
					handleClose={handleClosePopup}
				/>
			)}

			{approveModal && (
				<ModalApprove
					show={approveModal}
					content={`Xác nhận duyệt phiếu nhập kho?`}
					handleAction={fetchApprove}
					handleCancel={fetchCancel}
					onHide={() => setApproveModal(false)}
					buttonDisabled={buttonDisabled}
					handleButton={handleClick}
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
