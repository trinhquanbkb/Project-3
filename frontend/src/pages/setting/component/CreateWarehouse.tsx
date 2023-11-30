import React from "react";
import { Row, Col, Button, Form } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { useCreateWarehouseMutation } from "../../../api/warehouseApi";
import SelectWarehouse from "../../../components/Input/SelectWarehouse";

const CreateEmployee = ({
	handleClose,
	isClass,
}: {
	handleClose: () => void;
	isClass: string;
}) => {
	const [createWarehouse] = useCreateWarehouseMutation();

	// regex data
	const phoneRegex =
		/^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

	const formik = useFormik({
		initialValues: {
			username: "",
			phone: "",
			email: "",
			role_id: "",
			warehouse_id: "",
			password: "",
			passwordConfirm: "",
		},
		validationSchema: Yup.object({
			username: Yup.string().required("Trường bắt buộc!"),
			phone: Yup.string()
				.required("Trường bắt buộc!")
				.matches(phoneRegex, "Số điện thoại không hợp lệ"),
			email: Yup.string()
				.required("Trường bắt buộc!")
				.matches(emailRegex, "Email không hợp lệ"),
			role_id: Yup.string().nullable().required("Trường bắt buộc!"),
			warehouse_id: Yup.string().nullable().required("Trường bắt buộc!"),
			password: Yup.string()
				.required("Trường bắt buộc!")
				.matches(
					passwordRegex,
					"Mật khẩu có ít nhất 1 chữ cái, 1 số và 8 ký tự"
				),
			passwordConfirm: Yup.string()
				.required("Trường bắt buộc!")
				.matches(
					passwordRegex,
					"Mật khẩu có ít nhất 1 chữ cái, 1 số và 8 ký tự"
				),
		}),
		onSubmit: async (values: any) => {
			if (values.password === values.passwordConfim) {
				formik.setFieldError(
					"rePassword",
					"Mật khẩu không trùng khớp!"
				);
			} else {
				let dataRequest = values;
				delete dataRequest["passwordConfirm"];
				const res: any = await createWarehouse(dataRequest);
				if (res?.data) {
					toast.success("Tạo mới nhân sự thành công");
					handleClose();
				} else {
					toast.error("Tạo mới nhân sự thất bại");
				}
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
						<h2>Tạo nhân sự mới</h2>
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
														Tên nhân sự
													</Form.Label>
													<Form.Control
														type="text"
														name="username"
														placeholder="Nguyễn Văn A"
														value={
															formik.values
																.username
														}
														onChange={
															formik.handleChange
														}
													/>
													{formik.errors.username &&
														formik.touched
															.username && (
															<p className="error mb-0">
																{
																	formik
																		.errors
																		.username as string
																}
															</p>
														)}
												</Form.Group>
											</Col>

											<Col xs={12} md={6}>
												<Form.Group className="mb-3">
													<Form.Label>
														Số điện thoại
													</Form.Label>
													<Form.Control
														type="text"
														name="phone"
														placeholder="0327*******"
														value={
															formik.values.phone
														}
														onChange={
															formik.handleChange
														}
													/>
													{formik.errors.phone &&
														formik.touched
															.phone && (
															<p className="error mb-0">
																{
																	formik
																		.errors
																		.phone as string
																}
															</p>
														)}
												</Form.Group>
											</Col>

											<Col xs={12} md={6}>
												<Form.Group className="mb-3">
													<Form.Label>
														Email
													</Form.Label>
													<Form.Control
														type="text"
														name="email"
														placeholder="Abc@gmail.com"
														value={
															formik.values.email
														}
														onChange={
															formik.handleChange
														}
													/>
													{formik.errors.email &&
														formik.touched
															.email && (
															<p className="error mb-0">
																{
																	formik
																		.errors
																		.email as string
																}
															</p>
														)}
												</Form.Group>
											</Col>


											<Col
												xs={12}
												md={6}
												className="mb-3"
											>
												<SelectWarehouse
													id={null}
													handleChange={(id: any) => {
														formik.setValues({
															...formik.values,
															warehouse_id: id,
														});
													}}
												/>
												{formik.errors.warehouse_id &&
													formik.touched
														.warehouse_id && (
														<p className="error mb-0">
															{
																formik.errors
																	.warehouse_id as string
															}
														</p>
													)}
											</Col>

											<Col xs={12} md={6}></Col>

											<Col xs={12} md={6}>
												<Form.Group className="mb-3">
													<Form.Label>
														Mật khẩu
													</Form.Label>
													<Form.Control
														type="password"
														name="password"
														value={
															formik.values
																.password
														}
														onChange={
															formik.handleChange
														}
													/>
													{formik.errors.password &&
														formik.touched
															.password && (
															<p className="error mb-0">
																{
																	formik
																		.errors
																		.password as any
																}
															</p>
														)}
												</Form.Group>
											</Col>

											<Col xs={12} md={6}>
												<Form.Group className="mb-3">
													<Form.Label>
														Nhập lại mật khẩu
													</Form.Label>
													<Form.Control
														type="password"
														name="passwordConfirm"
														value={
															formik.values
																.passwordConfirm
														}
														onChange={
															formik.handleChange
														}
													/>
													{formik.errors
														.passwordConfirm &&
														formik.touched
															.passwordConfirm && (
															<p className="error mb-0">
																{
																	formik
																		.errors
																		.passwordConfirm as any
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

export default CreateEmployee;
