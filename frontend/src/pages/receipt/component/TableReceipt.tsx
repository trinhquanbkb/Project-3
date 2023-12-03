import React from "react";
import Table from "../../../components/Table";
import { sizePerPageList } from "../../../constants/sizePerPageList";
import { Card, Col, Row } from "react-bootstrap";
import { ITableReceipt } from "../../../models/receipt.model";

const columns = [
	{
		Header: "Mã PNK",
		accessor: "code",
		sort: true,
	},
	{
		Header: "Số lượng",
		accessor: "quantity",
		sort: true,
	},
	{
		Header: "Tổng cân nặng",
		accessor: "weight",
		sort: false,
	},
	{
		Header: "Đối tác",
		accessor: "supplier",
		sort: true,
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

			{/* {props.data == null || undefined
				? null
				: props.data.forEach(
						(item: any) => (
							(item["action"] = (
								<div className="group-btn-action">
									<button
										type="button"
										className="btn btn-create-order"
										onClick={() => {
											props.handleViewUser(item.id);
										}}
									>
										<i className="uil uil-eye"></i>
										<span className="title">
											Xem nhân sự
										</span>
									</button>
									<button
										type="button"
										className="btn btn-edit-tracking"
										onClick={() => {
											props.handleEditUser(item.id);
										}}
									>
										<i className="uil uil-edit-alt"></i>
										<span className="title">
											Sửa nhân sự
										</span>
									</button>
									<button
										type="button"
										className="btn btn-delete-tracking"
										onClick={() => {
											props.handleDeleteUser(item.id);
										}}
									>
										<i className="uil uil-times"></i>
										<span className="title">
											Xóa nhân sự
										</span>
									</button>
								</div>
							)),
							(item["code"] = (
								<p className="fw-bold">{item.code}</p>
							))
						)
				  )} */}
		</>
	);
};

export default TableReceipt;
