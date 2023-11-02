import React from "react";
import Table from "../../../components/Table";
import { sizePerPageList } from "../../../constants/sizePerPageList";

const columns = [
	{
		Header: "Mã nhân viên",
		accessor: "code",
		sort: true,
	},
	{
		Header: "Họ tên",
		accessor: "name",
		sort: true,
	},
	{
		Header: "Email",
		accessor: "email",
		sort: true,
	},
	{
		Header: "Số điện thoại",
		accessor: "phone",
		sort: false,
	},
	{
		Header: "Hành động",
		accessor: "action",
		sort: false,
	},
];

const TableEmployee = (props: any) => {
	return (
		<>
			<Table
				tableClass={"table-custom"}
				columns={columns}
				data={props.data == null || undefined ? [] : props.data}
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
											Xem nhân viên
										</span>
									</button>
									<button
										type="button"
										className="btn btn-edit-tracking"
									>
										<i className="uil uil-edit-alt"></i>
										<span className="title">
											Sửa nhân viên
										</span>
									</button>
									<button
										type="button"
										className="btn btn-delete-tracking"
									>
										<i className="uil uil-times"></i>
										<span className="title">
											Xóa nhân viên
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

export default TableEmployee;
