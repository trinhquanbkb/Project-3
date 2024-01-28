import React, { useEffect, useState } from "react";
import { Row, Col, Button, Form, Breadcrumb } from "react-bootstrap";
import queryString from "query-string";

//dummy data
import { useLocation } from "react-router-dom";
import TableEmployee from "./component/TableEmployee";
import { useDeleteUserMutation, useGetUserListQuery } from "../../api/userApi";
import { IUserQuery } from "../../models/user.model";
import Loading from "../../components/Loading";
import ViewEmployee from "./component/ViewEmployee";
import NotFoundTable from "../../components/NotFoundTable";
import EditEmployee from "./component/EditEmployee";
import ModalConfirm from "../../components/ModalConfirm";
import { toast } from "react-toastify";
import CreateEmployee from "./component/CreateEmployee";
import SelectRole from "../../components/Input/SelectRole";

const listBreadCrumb = [
	{
		path: "/",
		label: "Home",
		active: false,
		icon: "uil-home-alt",
	},
	{
		path: "/",
		label: "Quản lý nhân sự",
		active: true,
	},
];

const TrackingList = () => {
	const location = useLocation();
	const [idUser, setIdUser] = useState("");
	const [keywordUsername, setKeywordUsername] = useState("");
	const [keywordEmail, setKeywordEmail] = useState("");
	const [viewModal, setViewModal] = useState(false);
	const [createModal, setCreateModal] = useState(false);
	const [editModal, setEditModal] = useState(false);
	const [deleteModal, setDeleteModal] = useState(false);
	const [search, setSearch] = useState<any>({
		page: 1,
		pageSize: 10,
		username: "",
		role_id: "",
		email: "",
	});

	// fetch user
	const { data: listUser, isFetching } = useGetUserListQuery({
		page: search.page,
		pageSize: search.pageSize,
		filter: {
			username: search.username.trim(),
			role_id: search.role_id.trim(),
			email: search.email.trim(),
		},
	});

	// api delete user
	const [deleteUserApi] = useDeleteUserMutation();

	useEffect(() => {
		const query = location.search;
		const parsed = queryString.parse(query);
		const page = parsed.page ? Number(parsed.page) : 1;
		const pageSize = parsed.pageSize ? Number(parsed.pageSize) : 10;
		const username = parsed.username ? parsed.username.toString() : "";
		const roleId = parsed.roleId ? parsed.roleId.toString() : "";
		const email = parsed.email ? parsed.email.toString() : "";

		setSearch({
			...search,
			page,
			pageSize,
			username,
			role_id: roleId,
			email: email,
		});

		if (username) {
			setKeywordUsername(username);
		}
		if (email) {
			setKeywordEmail(email);
		}
	}, []);

	// xử lý việc url thay đổi khi có filter
	useEffect(() => {
		const query = queryString.stringifyUrl(
			{
				url: "/employees",
				query: {
					page: search.page,
					pageSize: search.pageSize,
					username: search.username,
					roleId: search.role_id,
					email: search.email,
				},
			},
			{
				skipEmptyString: true,
			}
		);
		window.history.pushState(null, "", query);
	}, [search]);

	// handle filter page with page and pageSize
	const handleFilterPage = (filter: any) => {
		setSearch({
			...search,
			page: filter.page,
			pageSize: filter.pageSize,
		});
	};

	const handleViewUser = (id: string) => {
		setViewModal(!viewModal);
		setIdUser(id);
	};

	const handleEditUser = (id: string) => {
		setEditModal(!editModal);
		setIdUser(id);
	};

	const handleDeleteUser = (id: string) => {
		setDeleteModal(!deleteModal);
		setIdUser(id);
	};

	const handleSearchOnEnter = (event: any) => {
		event.preventDefault();
		if (event.key === "Enter") {
			setSearch({
				...search,
				username: keywordUsername.trim(),
				email: keywordEmail.trim(),
			});
		}
	};

	const handleClosePopup = () => {
		if (viewModal) {
			setViewModal(!viewModal);
		}
		if (editModal) {
			setEditModal(!editModal);
		}
		if (deleteModal) {
			setDeleteModal(!deleteModal);
		}
		if (createModal) {
			setCreateModal(!createModal);
		}
	};

	const apiDeleteUser = async () => {
		const res: any = await deleteUserApi(idUser);
		if (res?.data) {
			setDeleteModal(!deleteModal);
			toast.success("Xóa nhân sự thành công!");
		} else {
			toast.error("Xóa nhân sự thất bại");
		}
	};

	return (
		<>
			<Row>
				<Col xs={12}>
					<div className="page-title-box">
						<Breadcrumb listProps={{ className: "m-0" }}>
							{(listBreadCrumb || []).map((item, index) => {
								return item.active ? (
									<Breadcrumb.Item active key={index}>
										{item.icon !== "" ? (
											<i
												className={`uil ${item.icon}`}
											></i>
										) : (
											""
										)}{" "}
										{item.label}
									</Breadcrumb.Item>
								) : (
									<Breadcrumb.Item
										key={index}
										href={item.path}
									>
										{item.icon !== "" ? (
											<i
												className={`uil ${item.icon}`}
											></i>
										) : (
											""
										)}{" "}
										{item.label}
									</Breadcrumb.Item>
								);
							})}
						</Breadcrumb>
						<div className="page-title-right">
							<div className="mt-2 mt-md-0">
								<Button
									variant="primary"
									className="mb-2 mb-sm-0"
									onClick={() => {
										setCreateModal(!createModal);
									}}
								>
									<i className="uil-plus me-1"></i> Thêm nhân
									sự
								</Button>
							</div>
						</div>
					</div>
				</Col>
			</Row>

			<hr className="mt-0" />

			<Row>
				<Col xs={12}>
					<div className="wrap-filter">
						<div className="list-input">
							<Row>
								<Col xs={3}>
									<div className="col-left">
										<div className="input-search">
											<Form.Group className="form-search-user form-search-tracking">
												<Form.Control
													type="search"
													placeholder="Tìm kiếm theo tên"
													onChange={(e) => {
														setKeywordUsername(
															e.target.value
														);
													}}
													value={keywordUsername}
													onKeyUp={
														handleSearchOnEnter
													}
												/>
												<Button
													type="submit"
													className="btn-search"
													onClick={() => {
														setSearch({
															...search,
															username:
																keywordUsername.trim(),
														});
													}}
												></Button>
											</Form.Group>
										</div>
									</div>
								</Col>

								<Col xs={3}>
									<div className="col-right">
										<div className="input-search">
											<Form.Group className="form-search-user form-search-tracking">
												<Form.Control
													type="search"
													placeholder="Tìm kiếm theo email"
													onChange={(e) => {
														setKeywordEmail(
															e.target.value
														);
													}}
													value={keywordEmail}
													onKeyUp={
														handleSearchOnEnter
													}
												/>
												<Button
													type="submit"
													className="btn-search"
													onClick={() => {
														setSearch({
															...search,
															email: keywordEmail.trim(),
														});
													}}
												></Button>
											</Form.Group>
										</div>
									</div>
								</Col>

								<Col xs={3}>
									<div className="col-right">
										<div className="input-search">
											<SelectRole
												id={search.role_id}
												handleChange={(id: any) => {
													setSearch({
														...search,
														role_id: id,
													});
												}}
												placeholder="Vai trò"
											/>
										</div>
									</div>
								</Col>
							</Row>
						</div>
					</div>
				</Col>
			</Row>

			{isFetching ? (
				<Loading />
			) : listUser ? (
				<TableEmployee
					handleFilter={handleFilterPage}
					paginations={listUser.paginations}
					handleViewUser={handleViewUser}
					handleEditUser={handleEditUser}
					handleDeleteUser={handleDeleteUser}
					data={
						listUser
							? listUser.data.map((item) => {
									return {
										id: item._id,
										code: item._id,
										username: item.username,
										email: item.email,
										phone: item.phone,
										role: item.role_id.name,
										warehouse: item.warehouse_id.name,
									};
							  })
							: null
					}
				/>
			) : (
				<NotFoundTable />
			)}

			{viewModal && (
				<ViewEmployee
					isClass={"active"}
					id={idUser}
					handleClose={handleClosePopup}
				/>
			)}

			{editModal && (
				<EditEmployee
					isClass={"active"}
					id={idUser}
					handleClose={handleClosePopup}
				/>
			)}

			{deleteModal && (
				<ModalConfirm
					show={deleteModal}
					content={`Xác nhận xóa nhân viên?`}
					handleAction={apiDeleteUser}
					onHide={() => setDeleteModal(false)}
				/>
			)}

			{createModal && (
				<CreateEmployee
					isClass={"active"}
					handleClose={handleClosePopup}
				/>
			)}
		</>
	);
};

export default TrackingList;
