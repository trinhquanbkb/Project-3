import { Row, Col, Button, Form } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { useCreateProductMutation } from "../../../api/productApi";

const CreateCategory = ({
	handleClose,
	isClass,
}: {
	handleClose: () => void;
	isClass: string;
}) => {
	const [createCategory] = useCreateProductMutation();

	const formik = useFormik({
		initialValues: {
			name: "",
		},
		onSubmit: async (values: any) => {
			const res: any = await createCategory({
				product_name: values.name,
				quantity: 0,
				category: [],
				url: "https://res.cloudinary.com/mrcj/image/upload/v1702620298/Cloudinary-Re…",
				products_items: [],
			});
			if (res?.data) {
				toast.success("Tạo danh mục sản phẩm mới thành công");
				handleClose();
			} else {
				toast.error("Tạo danh mục sản phẩm mới thất bại");
			}
		},
	});

	return (
		<>
			<div
				className={`popup-info main-view-order ${
					isClass === "active" ? "opened" : ""
				}`}
			>
				<div className="popup-info-inner">
					<div className="title-popup">
						<h2>Tạo danh mục mới</h2>
						<span className="close" onClick={handleClose}></span>
					</div>

					<div className="popup-inner main-edit-order view-order main-create-order">
						<div className="content-order-detail">
							<div className="wrap-order-detail w-100">
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
															formik.values.name
														}
														onChange={
															formik.handleChange
														}
													/>
												</Form.Group>
											</Col>

											<Col xs={12} md={6}>
												<Form.Group className="mb-3">
													<Form.Label>Ảnh</Form.Label>
													<div className="img-product">
														<img
															src="..."
															alt="gsdgsd"
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

export default CreateCategory;
