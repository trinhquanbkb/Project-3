import React from "react";
import Table from "../../../components/Table";
import { sizePerPageList } from "../../../constants/sizePerPageList";
import { Card, Col, Row } from "react-bootstrap";
import { ITableWarehouse } from "../../../models/warehouse.model";

const columns = [
	{
		Header: "Mã Nhà kho",
		accessor: "id",
	},
	{
		Header: "Tên nhà kho",
		accessor: "name",
	},
	{
		Header: "Địa chỉ",
		accessor: "address.address",
		sort: false,
	},
	{
		Header: "Phường/Xã",
		accessor: "address.wards",
		sort: false,
	},
	{
		Header: "Quận/Huyện",
		accessor: "address.district",
		sort: false,
	},
	{
		Header: "Thành phố",
		accessor: "address.city",
		sort: false,
	},
	{
		Header: "Hành động",
		accessor: "action",
		sort: false,
		width: 200,
	},
];

const TableWarehouse = (props: ITableWarehouse) => {
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
										onClick={() => {
											props.handleViewWarehouse(item.id);
										}}
									>
										<i className="uil uil-eye"></i>
										<span className="title">
											Xem nhà kho
										</span>
									</button>
									<button
										type="button"
										className="btn btn-edit-tracking"
										onClick={() => {
											props.handleEditWarehouse(item.id);
										}}
									>
										<i className="uil uil-edit-alt"></i>
										<span className="title">
											Sửa nhà kho
										</span>
									</button>
								</div>
							)),
							(item["code"] = (
								<p className="fw-bold">{item.code}</p>
							))
						)
				  )}
		</>
	);
};

export default TableWarehouse;
