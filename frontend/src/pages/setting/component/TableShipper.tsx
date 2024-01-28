import Table from "../../../components/Table";
import { sizePerPageList } from "../../../constants/sizePerPageList";
import { Card, Col, Row } from "react-bootstrap";
import { ITableShipper } from "../../../models/shipper.model";

const columns = [
	{
		Header: "Mã đơn vị",
		accessor: "id",
	},
	{
		Header: "Tên đối tác",
		accessor: "name",
	},
	{
		Header: "Điện thoại",
		accessor: "phone",
	},
	{
		Header: "Email",
		accessor: "email",
	},
	{
		Header: "Địa chỉ",
		accessor: "address.address",
	},
	{
		Header: "Phường/Xã",
		accessor: "address.wards",
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

const TableShipper = (props: ITableShipper) => {
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
											props.handleViewShipper(item.id);
										}}
									>
										<i className="uil uil-eye"></i>
										<span className="title">
											Xem đối tác
										</span>
									</button>
									<button
										type="button"
										className="btn btn-edit-tracking"
										onClick={() => {
											props.handleEditShipper(item.id);
										}}
									>
										<i className="uil uil-edit-alt"></i>
										<span className="title">
											Sửa đối tác
										</span>
									</button>
									<button
										type="button"
										className="btn btn-delete-tracking"
										onClick={() => {
											props.handleDeleteShipper(item.id);
										}}
									>
										<i className="uil uil-times"></i>
										<span className="title">
											Xóa đối tác
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

export default TableShipper;
