import { useEffect } from "react";
import { Row, Col, Button, Form } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import Loading from "../../../components/Loading";
import {
	useGetProductDetailQuery,
	useUpdateProductMutation,
} from "../../../api/productApi";
import ImageUpload from "../../../components/ImageUpload";

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
			url: "",
		},
		validationSchema: Yup.object({
			name: Yup.string().required("Trường bắt buộc!"),
			url: Yup.string().required("Trường bắt buộc!"),
		}),
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
				url: CategoryDetail.product_name,
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
														{formik.errors.name &&
															formik.touched
																.name && (
																<p className="error mb-0">
																	{
																		formik
																			.errors
																			.name as string
																	}
																</p>
															)}
													</Form.Group>
												</Col>

												<Col xs={12} md={6}>
													<Form.Group className="mb-3">
														<Form.Label>
															Ảnh
														</Form.Label>
														<ImageUpload
															url={
																formik.values
																	.url
															}
															setUrl={(
																url: any
															) => {
																console.log(
																	url
																);
																formik.setValues(
																	{
																		...formik.values,
																		url: url,
																	}
																);
															}}
														/>

														{formik.errors.url &&
															formik.touched
																.url && (
																<p className="error mb-0">
																	{
																		formik
																			.errors
																			.url as string
																	}
																</p>
															)}
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
