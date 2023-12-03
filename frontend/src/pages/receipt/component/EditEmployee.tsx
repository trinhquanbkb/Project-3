import React, { useEffect } from "react";
import { Row, Col, Button, Form } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import Loading from "../../../components/Loading";
import {
	useGetUserDetailQuery,
	useUpdateUserMutation,
} from "../../../api/userApi";

const EditEmployee = ({
	id,
	handleClose,
	isClass,
}: {
	id: string;
	handleClose: () => void;
	isClass: string;
}) => {
	const { data: userDetail, isFetching: fetchingUser } =
		useGetUserDetailQuery(id);
	const [updateUser] = useUpdateUserMutation();

	// regex data
	const phoneRegex =
		/^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

	const formik = useFormik({
		initialValues: {
			username: "",
			phone: "",
			email: "",
		},
		validationSchema: Yup.object({
			username: Yup.string().required("Trường bắt buộc!"),
			phone: Yup.string()
				.required("Trường bắt buộc!")
				.matches(phoneRegex, "Số điện thoại không hợp lệ"),
			email: Yup.string()
				.required("Trường bắt buộc!")
				.matches(emailRegex, "Email không hợp lệ"),
		}),
		onSubmit: async (values: any) => {
			const res: any = await updateUser({
				id: id,
				...values,
			});
			if (res?.data) {
				handleClose();
				toast.success("Sửa thông tin nhân sự thành công!");
			} else {
				toast.error("Sửa thông tin nhân sự thất bại!");
			}
		},
	});

	useEffect(() => {
		if (userDetail) {
			formik.setValues({
				...formik.values,
				username: userDetail.username,
				phone: userDetail.phone,
				email: userDetail.email,
			});
		}
	}, [userDetail]);

	return (
		<>
			<div
				className={`popup-info main-view-order ${
					isClass === "active" ? "opened" : ""
				}`}
			>
				<div className="popup-info-inner">
					<div className="title-popup">
						<h2>Sửa thông tin nhân sự</h2>
						<span className="close" onClick={handleClose}></span>
					</div>

					<div className="popup-inner main-edit-order view-order main-create-order">
						<div className="content-order-detail">
							<div className="wrap-order-detail w-100">
								{fetchingUser ? (
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
														{formik.errors
															.username &&
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
																formik.values
																	.phone
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
																formik.values
																	.email
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

export default EditEmployee;
