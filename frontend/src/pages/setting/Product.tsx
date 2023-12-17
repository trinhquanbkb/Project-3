import { useEffect, useState } from "react";
import { Row, Col, Button, Form, Breadcrumb } from "react-bootstrap";
import queryString from "query-string";

import {
	useDeleteCategoryMutation,
	useGetCategoryListQuery,
} from "../../api/categoryApi";
import NotFoundTable from "../../components/NotFoundTable";
import Loading from "../../components/Loading";
import EditCategory from "./component/EditCategory";
import ViewCategory from "./component/ViewCategory";
import CreateCategory from "./component/CreateCategory";
import ModalConfirm from "../../components/ModalConfirm";
import { toast } from "react-toastify";
import TableCategory from "./component/TableCategory";
import { ICategoryQuery } from "../../models/category.model";

const listBreadCrumb = [
	{
		path: "/",
		label: "Home",
		active: false,
		icon: "uil-home-alt",
	},
	{
		path: "/Categorys",
		label: "Quản lý loại sản phẩm",
		active: true,
	},
];

const CategoryList = () => {
	const [idCategory, setIdCategory] = useState("");
	const [keywordCategoryName, setKeywordCategoryName] = useState("");
	const [viewModal, setViewModal] = useState(false);
	const [createModal, setCreateModal] = useState(false);
	const [editModal, setEditModal] = useState(false);
	const [deleteModal, setDeleteModal] = useState(false);
	const [search, setSearch] = useState<any>({
		page: 1,
		pageSize: 10,
		name: "",
	});

	const { data: listCategory, isFetching } = useGetCategoryListQuery({
		...search,
	});

	const [deleteCategoryApi] = useDeleteCategoryMutation();

	useEffect(() => {
		const query = queryString.stringifyUrl(
			{
				url: "/product",
				query: {
					page: search.page,
					pageSize: search.pageSize,
					name: search.name,
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

	const handleViewCategory = (id: string) => {
		setViewModal(!viewModal);
		setIdCategory(id);
	};

	const handleEditCategory = (id: string) => {
		setEditModal(!editModal);
		setIdCategory(id);
	};

	const handleDeleteCategory = (id: string) => {
		setDeleteModal(!deleteModal);
		setIdCategory(id);
	};

	const handleSearchOnEnter = (event: any) => {
		event.preventDefault();
		if (event.key === "Enter") {
			setSearch({
				...search,
				name: keywordCategoryName.trim(),
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

	const apiDeleteCategory = async () => {
		const res: any = await deleteCategoryApi(idCategory);
		if (res?.data) {
			setDeleteModal(!deleteModal);
			toast.success("Xóa nhà kho thành công!");
		} else {
			toast.error("Xóa nhà kho thất bại");
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
									<i className="uil-plus me-1"></i> Thêm loai
									san pham
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
														setKeywordCategoryName(
															e.target.value
														);
													}}
													value={keywordCategoryName}
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
															name: keywordCategoryName.trim(),
														});
													}}
												></Button>
											</Form.Group>
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
			) : listCategory ? (
				<TableCategory
					handleFilter={handleFilterPage}
					paginations={listCategory.paginations}
					handleViewCategory={handleViewCategory}
					handleEditCategory={handleEditCategory}
					handleDeleteCategory={handleDeleteCategory}
					data={
						listCategory
							? listCategory.data.map((item) => {
									return {
										id: item._id,
										name: item.name,
									};
							  })
							: null
					}
				/>
			) : (
				<NotFoundTable />
			)}

			{viewModal && (
				<ViewCategory
					isClass={"active"}
					id={idCategory}
					handleClose={handleClosePopup}
				/>
			)}

			{editModal && (
				<EditCategory
					isClass={"active"}
					id={idCategory}
					handleClose={handleClosePopup}
				/>
			)}

			{deleteModal && (
				<ModalConfirm
					show={deleteModal}
					content={`Xác nhận xóa nhà kho?`}
					handleAction={apiDeleteCategory}
					onHide={() => setDeleteModal(false)}
				/>
			)}

			{createModal && (
				<CreateCategory
					isClass={"active"}
					handleClose={handleClosePopup}
				/>
			)}
		</>
	);
};

export default CategoryList;
