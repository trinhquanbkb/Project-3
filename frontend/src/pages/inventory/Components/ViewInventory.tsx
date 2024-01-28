import React, { useEffect, useState } from "react";
import { useGetProductDetailQuery } from "../../../api/productApi";
import Loading from "../../../components/Loading";
import { useParams } from "react-router-dom";
import { Breadcrumb, Button, Card, Modal } from "react-bootstrap";
import { convertDate } from "../../../utils/function";
import TableFullData from "../../../components/TableFullData";
import { checkStatusProductItem } from "../../../constants/status";
import { useCreateReportMutation } from "../../../api/reportApi";
import { toast } from "react-toastify";

const listBreadCrumb = [
	{
		path: "/",
		label: "Home",
		active: false,
		icon: "uil-home-alt",
	},
	{
		path: "/inventory",
		label: "Danh sách hàng tồn kho",
		active: false,
	},
	{
		path: "#",
		label: "Chi tiết hàng tồn kho",
		active: true,
	},
];

const columns = [
	{
		Header: "Mã sản phẩm",
		accessor: "id",
		sort: false,
		width: 80,
	},
	{
		Header: "Trạng thái",
		accessor: "status",
		sort: false,
	},
	{
		Header: "Số lượng nhập kho",
		accessor: "quantity",
		sort: false,
	},
	{
		Header: "Số lượng xuất kho",
		accessor: "quantitySold",
		sort: false,
	},
	{
		Header: "Đơn vị tính",
		accessor: "weight",
		sort: false,
	},
	{
		Header: "Giá nhập/sản phẩm",
		accessor: "price",
		sort: false,
	},
	{
		Header: "Kho",
		accessor: "warehouse",
		sort: false,
	},
	{
		Header: "Đối tác",
		accessor: "supplier",
		sort: false,
	},
	{
		Header: "Ngày hết hạn",
		accessor: "expriryData",
		sort: false,
	},
];

const ViewInventory = () => {
	const { id } = useParams<{ id: string }>();
	const { data, isFetching } = useGetProductDetailQuery(id);
	const [dataTable, setDataTable] = useState<any[]>();
	const [show, setShow] = useState(false);
	const [content, setContent] = useState<string>("");
	const [createReport] = useCreateReportMutation();

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	useEffect(() => {
		if (data) {
			const dataRender = data.product_items.map((item) => {
				return {
					id: item._id,
					quantity: item.quantity,
					quantitySold: item.quantity_sold,
					weight: item.weight,
					price: item.price,
					warehouse: item.warehouse_id[0].name,
					supplier: item.supplier_id[0].name,
					expriryData: item.expriry_data
						? convertDate(item.expriry_data)
						: "Không có",
					status: (
						<p
							className={`mb-0 status ${checkStatusProductItem(
								item.hide ? "Chưa duyệt" : "Đã duyệt"
							)}`}
						>
							{item.hide ? "Chưa duyệt" : "Đã duyệt"}
						</p>
					),
				};
			});
			setDataTable(dataRender);
		}
	}, [isFetching, data]);

	return (
		<>
			<Breadcrumb listProps={{ className: "m-0" }}>
				{(listBreadCrumb || []).map((item, index) => {
					return item.active ? (
						<Breadcrumb.Item active key={index}>
							{item.icon !== "" ? (
								<i className={`uil ${item.icon}`}></i>
							) : (
								""
							)}{" "}
							{item.label}
						</Breadcrumb.Item>
					) : (
						<Breadcrumb.Item key={index} href={item.path}>
							{item.icon !== "" ? (
								<i className={`uil ${item.icon}`}></i>
							) : (
								""
							)}{" "}
							{item.label}
						</Breadcrumb.Item>
					);
				})}
			</Breadcrumb>

			<div className="page-title-right mt-1 mb-2">
				<div className="mt-2 mt-md-0 d-flex justify-content-end">
					<Button
						variant="primary"
						className="mb-2 mb-sm-0"
						onClick={() => {
							handleShow();
						}}
					>
						<i className="uil-plus me-1"></i> Tạo báo cáo
					</Button>
				</div>
			</div>

			{data ? (
				<>
					<div className="infor-general">
						<Card>
							<Card.Header
								style={{ backgroundColor: "aliceblue" }}
							>
								Thông tin chung
							</Card.Header>
							<Card.Body className="d-flex flex-column flex-lg-row align-items-lg-center align-items-start justify-content-start">
								<span className="me-2">
									Mã danh mục sản phẩm:{" "}
									<strong>{data?._id}</strong>
								</span>
								<span className="my-1 ms-md-4">
									Tên sản phẩm:{" "}
									<strong>{data?.product_name}</strong>
								</span>
								<span className="my-1 ms-md-4">
									Tổng số lượng tồn kho:{" "}
									<strong>{data?.quantity}</strong>
								</span>
								<span className="my-1 ms-md-4">
									Ngày tạo:{" "}
									<strong>
										{convertDate(data?.createdAt)}
									</strong>
								</span>
							</Card.Body>
						</Card>
					</div>

					<div>
						<TableFullData
							tableClass={"table-custom"}
							columns={columns}
							data={dataTable ? dataTable : []}
							isSortable={true}
							isExpandable={true}
						/>
					</div>
				</>
			) : (
				<Loading />
			)}

			<Modal show={show} onHide={handleClose} animation={false}>
				<Modal.Header closeButton>
					<Modal.Title>Nhập nội dung</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<textarea
						className="w-100 px-2 py-1"
						style={{ minHeight: "120px" }}
						onChange={(e) => {
							setContent(e.target.value);
						}}
					></textarea>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={handleClose}>
						Đóng
					</Button>
					<Button
						variant="primary"
						onClick={async () => {
							const res = await createReport({
								product_id: data?._id,
								note: content,
							});
							if (res) {
								toast.success(
									`Tạo báo cáo cho sản phẩm '${data?.product_name}' thành công!`
								);
							} else {
								toast.error(
									`Tạo báo cáo cho sản phẩm '${data?.product_name}' thất bại!`
								);
							}
							handleClose();
						}}
					>
						Gửi báo cáo
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
};

export default ViewInventory;
