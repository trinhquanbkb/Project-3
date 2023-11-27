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
	const [btnData, setBtnData] = useState("tat-ca");
	const [idUser, setIdUser] = useState("");
	const [keywordTracking, setKeywordTracking] = useState();
	const [viewModal, setViewModal] = useState(false);
	const [editModal, setEditModal] = useState(false);
	const [deleteModal, setDeleteModal] = useState(false);
	const [search, setSearch] = useState<IUserQuery>({
		page: 1,
		pageSize: 10,
		username: "",
	});

	// fetch user
	const { data: listUser, isFetching } = useGetUserListQuery({ ...search });

	// api delete user
	const [deleteUserApi] = useDeleteUserMutation();

	useEffect(() => {
		const query = location.search;
		const parsed = queryString.parse(query);
		const page = parsed.page ? Number(parsed.page) : 1;
		const pageSize = parsed.pageSize ? Number(parsed.pageSize) : 10;
		const username = parsed.username ? parsed.username.toString() : "";

		setSearch({
			...search,
			page,
			pageSize,
			username,
		});
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

	const handleKeywordTracking = (event: any) => {
		setKeywordTracking(event.target.value);
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
													onChange={
														handleKeywordTracking
													}
													value={
														keywordTracking || ""
													}
												/>
												<Button
													type="submit"
													className="btn-search"
												></Button>
											</Form.Group>
										</div>
									</div>
								</Col>

								<Col xs={6}>
									<div className="col-right">
										<Form.Select
											className="list-time-select"
											aria-label="Default select example"
										>
											<option value="1">Admin</option>
											<option value="2">Quản lý</option>
											<option value="3">
												Nhân viên kho
											</option>
											<option value="4">Ké toán</option>
										</Form.Select>
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
		</>
	);
};

export default TrackingList;
