import React, { useEffect, useState } from "react";
import { Row, Col, Button, Form, Breadcrumb } from "react-bootstrap";
import queryString from "query-string";

//dummy data
import { useLocation } from "react-router-dom";
import Loading from "../../components/Loading";
import NotFoundTable from "../../components/NotFoundTable";
import { toast } from "react-toastify";
import { IReceiptQuery } from "../../models/receipt.model";
import ModalApprove from "./component/ModalApprove";
import CreateDeliveryBill from "./component/CreateDeliveyBill";
import {
	useCancelDeliveryBillMutation,
	useGetDeliveryBillListQuery,
	useWaitingDeliveryBillMutation,
} from "../../api/deliveryBillApi";
import TableDeliveryBill from "./component/TableDeliveryBill";
import ViewDeliveryBill from "./component/ViewDeliveryBill";
import ModalExport from "./component/ModalExport";
import { convertDate } from "../../utils/function";

const listBreadCrumb = [
	{
		path: "/",
		label: "Home",
		active: false,
		icon: "uil-home-alt",
	},
	{
		path: "/delivery-bill",
		label: "Phiếu xuất kho",
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
	const [exportModal, setExportModal] = useState(false);
	const [waitingApi] = useWaitingDeliveryBillMutation();
	const [cancelApi] = useCancelDeliveryBillMutation();
	const [search, setSearch] = useState<IReceiptQuery>({
		page: 1,
		pageSize: 10,
	});
	const [filter, setFilter] = useState({ code: "" });
	const { data: listDeliveryBill, isFetching: fetchingDeliveryBill } =
		useGetDeliveryBillListQuery({
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
				url: "/delivery-bill",
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

	const handleViewDeliveryBill = (id: string) => {
		setViewModal(!viewModal);
		setId(id);
	};

	const handleEditDeliveryBill = (id: string) => {
		setEditModal(!editModal);
		setId(id);
	};

	const handleDeleteDelieryBill = (id: string) => {
		setDeleteModal(!deleteModal);
		setId(id);
	};

	const handleApproveDelieryBill = (id: string) => {
		setApproveModal(!approveModal);
		setId(id);
	};

	const handleExportDelieryBill = (id: string) => {
		setExportModal(!exportModal);
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
		const res = await waitingApi(id);
		if (res) {
			toast.success("Duyệt phiếu thành công!");
			setApproveModal(!approveModal);
			setButtonDisabled(false);
		} else {
			toast.error("Server: Lỗi xử lý!");
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
			toast.error("Server: Lỗi xử lý!");
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
									xuất kho
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
													placeholder="Tìm kiếm mã phiếu xuất kho"
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
															setSearch({
																...search,
																page: 1,
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
														setSearch({
															...search,
															page: 1,
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

			{fetchingDeliveryBill ? (
				<Loading />
			) : listDeliveryBill ? (
				<TableDeliveryBill
					handleFilter={handleFilterPage}
					paginations={listDeliveryBill.paginations}
					handleViewDeliveryBill={handleViewDeliveryBill}
					handleEditDeliveryBill={handleEditDeliveryBill}
					handleDeleteDelieryBill={handleDeleteDelieryBill}
					handleApproveDelieryBill={handleApproveDelieryBill}
					handleExportDelieryBill={handleExportDelieryBill}
					data={
						listDeliveryBill
							? listDeliveryBill.data.map((item) => {
									return {
										id: item._id,
										status: item.status,
										sender: item.sender,
										receiver: item.receiver,
										shipping: item.shipping_id
											? item.shipping_id.name
											: null,
										address: item.address,
										createdAt: convertDate(item.createdAt),
										tracking: item.tracking,
									};
							  })
							: null
					}
				/>
			) : (
				<NotFoundTable />
			)}

			{viewModal && (
				<ViewDeliveryBill
					isClass={"active"}
					id={id}
					handleClose={handleClosePopup}
				/>
			)}

			{approveModal && (
				<ModalApprove
					show={approveModal}
					content={`Xác nhận duyệt phiếu xuất kho?`}
					handleAction={fetchApprove}
					handleCancel={fetchCancel}
					onHide={() => setApproveModal(false)}
					buttonDisabled={buttonDisabled}
					handleButton={handleClick}
				/>
			)}

			{exportModal && (
				<ModalExport
					show={exportModal}
					content={`Điền thông tin vận chuyển đơn hàng:`}
					handleAction={() => {
						setButtonDisabled(false);
						setExportModal(!exportModal);
					}}
					id={id}
					onHide={() => setExportModal(!exportModal)}
					buttonDisabled={buttonDisabled}
					handleButton={handleClick}
				/>
			)}

			{createModal && (
				<CreateDeliveryBill
					isClass={"active"}
					handleClose={handleClosePopup}
				/>
			)}
		</>
	);
};

export default ReceiptList;
