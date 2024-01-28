import { useEffect, useState } from "react";
import { Row, Col, Button, Form, Breadcrumb } from "react-bootstrap";
import queryString from "query-string";

import { useDeleteCategoryMutation } from "../../api/categoryApi";
import NotFoundTable from "../../components/NotFoundTable";
import Loading from "../../components/Loading";
import EditCategory from "./component/EditCategory";
import ViewCategory from "./component/ViewCategory";
import CreateCategory from "./component/CreateCategory";
import TableCategory from "./component/TableCategory";
import { useGetProductListQuery } from "../../api/productApi";
import { useLocation } from "react-router-dom";

const listBreadCrumb = [
	{
		path: "/",
		label: "Home",
		active: false,
		icon: "uil-home-alt",
	},
	{
		path: "/Categorys",
		label: "Quản lý danh mục sản phẩm",
		active: true,
	},
];

const Category = () => {
	const location = useLocation();
	const [idCategory, setIdCategory] = useState("");
	const [keywordCategoryName, setKeywordCategoryName] = useState("");
	const [viewModal, setViewModal] = useState(false);
	const [createModal, setCreateModal] = useState(false);
	const [editModal, setEditModal] = useState(false);
	const [search, setSearch] = useState<any>({
		page: 1,
		pageSize: 10,
		name: "",
	});

	const { data: listCategory, isFetching } = useGetProductListQuery({
		...search,
		filter: { name: search.name },
	});

	useEffect(() => {
		const query = location.search;
		const parsed = queryString.parse(query);
		const page = parsed.page ? Number(parsed.page) : 1;
		const pageSize = parsed.pageSize ? Number(parsed.pageSize) : 10;
		const name = parsed.name ? parsed.name.toString() : "";

		setSearch({
			...search,
			page,
			pageSize,
			name,
		});

		setKeywordCategoryName(name);
	}, []);

	useEffect(() => {
		const query = queryString.stringifyUrl(
			{
				url: "/setting/category",
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
		if (createModal) {
			setCreateModal(!createModal);
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
									<i className="uil-plus me-1"></i> Thêm danh
									mục sản phẩm
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
					data={
						listCategory
							? listCategory.data.map((item) => {
									return {
										id: item._id,
										name: item.product_name,
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

			{createModal && (
				<CreateCategory
					isClass={"active"}
					handleClose={handleClosePopup}
				/>
			)}
		</>
	);
};

export default Category;
