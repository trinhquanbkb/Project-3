import React from "react";
import Table from "../../../components/Table";
import { sizePerPageList } from "../../../constants/sizePerPageList";
import { Card, Col, Row } from "react-bootstrap";
import { ITableInventory } from "../../../models/product.model";

const columns = [
	{
		Header: "Mã danh mục sản phẩm",
		accessor: "code",
		sort: false,
	},
	{
		Header: "Tên danh mục sản phẩm",
		accessor: "name",
		sort: false,
		width: 300,
	},
	{
		Header: "Số lượng tồn kho",
		accessor: "quantity",
		sort: false,
	},
	{
		Header: "Số lượng đã bán",
		accessor: "quantitySold",
		sort: false,
	},
	{
		Header: "Tổng cân tồn kho",
		accessor: "totalWeight",
		sort: false,
	},
	{
		Header: "Hành động",
		accessor: "action",
		sort: false,
	},
];

const TableInventory = (props: ITableInventory) => {
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
											props.handleViewInventory(item.id);
										}}
									>
										<i className="uil uil-eye"></i>
										<span className="title">
											Xem chi tiết
										</span>
									</button>
								</div>
							)),
							(item["code"] = (
								<p className="fw-bold">{item.code}</p>
							)),
							(item["name"] = (
								<p
									style={{
										wordBreak: "break-word",
										whiteSpace: "normal",
									}}
								>
									{item.name}
								</p>
							))
						)
				  )}
		</>
	);
};

export default TableInventory;
