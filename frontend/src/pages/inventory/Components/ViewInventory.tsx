import React, { useEffect, useState } from "react";
import { useGetProductDetailQuery } from "../../../api/productApi";
import Loading from "../../../components/Loading";
import { useParams } from "react-router-dom";
import { Breadcrumb, Card } from "react-bootstrap";
import { convertDate } from "../../../utils/function";
import TableFullData from "../../../components/TableFullData";
import { checkStatusProductItem } from "../../../constants/status";

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
		Header: "Mã PNK",
		accessor: "idWarehouse",
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
		Header: "Cân nặng",
		accessor: "weight",
		sort: false,
	},
	{
		Header: "Giá nhập",
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

	useEffect(() => {
		if (data) {
			const dataRender = data.product_items.map((item) => {
				return {
					idWarehouse: null,
					quantity: item.quantity,
					quantitySold: item.quantity_sold,
					weight: item.weight,
					price: item.price,
					warehouse: item.warehouse_id,
					supplier: item.supplier_id,
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
									Mã sản phẩm: <strong>{data?._id}</strong>
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
		</>
	);
};

export default ViewInventory;
