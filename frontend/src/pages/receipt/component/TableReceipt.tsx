import React from "react";
import Table from "../../../components/Table";
import { sizePerPageList } from "../../../constants/sizePerPageList";
import { Card, Col, Row } from "react-bootstrap";
import { ITableReceipt } from "../../../models/receipt.model";
import { checkStatus } from "../../../constants/status";

const columns = [
	{
		Header: "Mã PNK",
		accessor: "id",
	},
	{
		Header: "Trạng thái",
		accessor: "statusCss",
		sort: false,
	},
	{
		Header: "Số lượng",
		accessor: "quantity",
	},
	{
		Header: "Tổng cân nặng",
		accessor: "weight",
		sort: false,
	},
	{
		Header: "Đối tác",
		accessor: "supplierId",
	},
	{
		Header: "Kho",
		accessor: "warehouseId",
	},
	{
		Header: "Ghi chú",
		accessor: "note",
		sort: false,
	},
	{
		Header: "Hành động",
		accessor: "action",
		sort: false,
	},
];

const TableReceipt = (props: ITableReceipt) => {
	return (
		<>
			<Row>
				<Col>
					<Card className="card-custom">
						<Card.Body>
							<Table
								tableClass={"table-custom table-customer"}
								columns={columns}
								data={!props.data ? [] : props.data}
								pageSize={
									props.paginations == null || undefined
										? 10
										: props.paginations.pageSize
								}
								sizePerPageList={sizePerPageList}
								handleFilter={props.handleFilter}
								isSortable={true}
								pagination={
									props.paginations == null || undefined
										? []
										: props.paginations
								}
								isExpandable={true}
							/>
						</Card.Body>
					</Card>
				</Col>
			</Row>

			{props.data == null || undefined
				? null
				: props.data.forEach(
						(item: any) => (
							(item["action"] = (
								<div className="group-btn-action">
									<button
										type="button"
										className="btn btn-create-order"
									>
										<i className="uil uil-eye"></i>
										<span className="title">
											Xem chi tiết
										</span>
									</button>
									{item.status !== "Thành công" ? (
										<button
											type="button"
											className="btn btn-delete-tracking"
										>
											<i className="uil uil-check"></i>
											<span className="title">
												Duyệt phiếu nhập kho
											</span>
										</button>
									) : null}
								</div>
							)),
							(item["statusCss"] = (
								<p
									className={`mb-0 status ${checkStatus(
										item.status
									)}`}
								>
									{item.status}
								</p>
							)),
							(item["id"] = (
								<p className="fw-bold mb-0">{item.id}</p>
							))
						)
				  )}
		</>
	);
};

export default TableReceipt;
