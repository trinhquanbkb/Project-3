import React from "react";

//dummy data
import { dataUser as data } from "../dataUser";

const columns = [
	{
		Header: "#",
		accessor: "stt",
		sort: false,
	},
	{
		Header: "Mã nhân viên",
		accessor: "code",
		sort: true,
	},
	{
		Header: "Họ và tên",
		accessor: "fullname",
		sort: true,
	},
	{
		Header: "Số điện thoại",
		accessor: "phone",
		sort: true,
	},
	{
		Header: "Email",
		accessor: "email",
		sort: true,
	},
	{
		Header: "Quyền",
		accessor: "role",
		sort: false,
	},
	{
		Header: "Hành động",
		accessor: "action",
		sort: false,
	},
];

const TableUser = (props: any) => {
	return <></>;
};

export default TableUser;
