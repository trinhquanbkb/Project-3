import { useEffect } from "react";
import { Row, Col, Button, Form } from "react-bootstrap";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import Loading from "../../../components/Loading";
import { useUpdateCategoryMutation } from "../../../api/categoryApi";
import {
	useGetProductDetailQuery,
	useUpdateProductMutation,
} from "../../../api/productApi";

const EditCategory = ({
	id,
	handleClose,
	isClass,
}: {
	id: string;
	handleClose: () => void;
	isClass: string;
}) => {
	const { data: CategoryDetail, isFetching: fetchingCategory } =
		useGetProductDetailQuery(id);
	const [updateCategory] = useUpdateProductMutation();

	const formik = useFormik({
		initialValues: {
			name: "",
		},
		onSubmit: async (values: any) => {
			const res: any = await updateCategory({
				id: id,
				data: {
					product_name: values.name,
				},
			});
			if (res?.data) {
				handleClose();

				toast.success("Sửa thông tin danh mục sản phẩm thành công!");
			} else {
				toast.error("Sửa thông tin danh mục sản phẩm thất bại!");
			}
		},
	});

	useEffect(() => {
		if (CategoryDetail) {
			formik.setValues({
				name: CategoryDetail.product_name,
			});
		}
	}, [CategoryDetail]);

	return (
		<>
			<div
				className={`popup-info main-view-order ${
					isClass === "active" ? "opened" : ""
				}`}
			>
				<div className="popup-info-inner">
					<div className="title-popup">
						<h2>Sửa thông tin danh mục sản phẩm</h2>
						<span className="close" onClick={handleClose}></span>
					</div>

					<div className="popup-inner main-edit-order view-order main-create-order">
						<div className="content-order-detail">
							<div className="wrap-order-detail w-100">
								{fetchingCategory ? (
									<Loading />
								) : (
									<Form
										onSubmit={(e) => {
											e.preventDefault();
											formik.handleSubmit();
										}}
									>
										<div className="order-detail">
											<Row>
												<Col xs={12} md={6}>
													<Form.Group className="mb-3">
														<Form.Label>
															Tên sản phẩm
														</Form.Label>
														<Form.Control
															type="text"
															name="name"
															value={
																formik.values
																	.name
															}
															onChange={
																formik.handleChange
															}
														/>
													</Form.Group>
												</Col>

												<Col xs={12} md={6}>
													<Form.Group className="mb-3">
														<Form.Label>
															Ảnh
														</Form.Label>
														<div className="img-product">
															<img
																src={
																	CategoryDetail?.url
																}
																alt="img-product"
															/>
														</div>
													</Form.Group>
												</Col>

												<Col
													xs={12}
													md={12}
													className="text-center"
												>
													<Button
														variant="outline-primary mx-2 fw-medium"
														onClick={handleClose}
													>
														<i className="uil uil-times me-1"></i>{" "}
														Hủy bỏ
													</Button>
													<Button
														variant="primary mx-2 fw-medium"
														type="submit"
													>
														<i className="uil uil-check me-1"></i>{" "}
														Xác nhận
													</Button>
												</Col>
											</Row>
										</div>
									</Form>
								)}
							</div>
						</div>
					</div>
				</div>
				<div
					className={`popup-overlay ${isClass}`}
					onClick={handleClose}
				></div>
			</div>
		</>
	);
};

export default EditCategory;
