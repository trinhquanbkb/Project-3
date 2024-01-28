import React from "react";
import Table from "../../../components/Table";
import { sizePerPageList } from "../../../constants/sizePerPageList";
import { Card, Col, Row } from "react-bootstrap";
import { ITableReport } from "../../../models/report.model";

const columns = [
	{
		Header: "STT",
		accessor: "stt",
		sort: false,
		width: 100,
	},
	{
		Header: "Người báo cáo",
		accessor: "username",
		sort: false,
	},
	{
		Header: "Tên sản phẩm",
		accessor: "productName",
		sort: false,
	},
	{
		Header: "Kho",
		accessor: "warehouse",
		sort: false,
	},
	{
		Header: "Ngày báo cáo",
		accessor: "createdAt",
		sort: false,
	},
	{
		Header: "Nội dung",
		accessor: "action",
		sort: false,
	},
];

const TableReport = (props: ITableReport) => {
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
						(item) =>
							(item["action"] = (
								<a
									style={{
										color: "#3b3bfd",
										textDecoration: "underline",
									}}
									href="#"
									onClick={() => {
										props.handleView(item.id);
									}}
								>
									Xem nội dung
								</a>
							))
				  )}
		</>
	);
};

export default TableReport;
