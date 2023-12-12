import React from "react";
import Table from "../../../components/Table";
import { sizePerPageList } from "../../../constants/sizePerPageList";
import { Card, Col, Row } from "react-bootstrap";
import { ITableCategory } from "../../../models/category.model";

const columns = [
	{
		Header: "Mã danh mục",
		accessor: "id",
	},
	{
		Header: "Tên danh mục",
		accessor: "name",
	},
	{
		Header: "Hành động",
		accessor: "action",
	},
];

const TableCategory = (props: ITableCategory) => {
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
											props.handleViewCategory(item.id);
										}}
									>
										<i className="uil uil-eye"></i>
										<span className="title">Xem</span>
									</button>
									<button
										type="button"
										className="btn btn-edit-tracking"
										onClick={() => {
											props.handleEditCategory(item.id);
										}}
									>
										<i className="uil uil-edit-alt"></i>
										<span className="title">Sửa</span>
									</button>
									<button
										type="button"
										className="btn btn-delete-tracking"
										onClick={() => {
											props.handleDeleteCategory(item.id);
										}}
									>
										<i className="uil uil-times"></i>
										<span className="title">Xóa</span>
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

export default TableCategory;
