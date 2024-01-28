import { Row, Col, Button, Form } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { useCreateShipperMutation } from "../../../api/shipperApi";
import FormAddress from "../../../components/FormAddress";

const CreateShipper = ({
	handleClose,
	isClass,
}: {
	handleClose: () => void;
	isClass: string;
}) => {
	const [createShipper] = useCreateShipperMutation();

	const formik = useFormik({
		initialValues: {
			name: "",
			address: "",
			wards: "",
			district: "",
			city: "",
			phone: 0,
			email: "",
		},
		validationSchema: Yup.object({
			address: Yup.string().required("Trường bắt buộc!"),
		}),
		onSubmit: async (values: any) => {
			const res: any = await createShipper({
				name: values.name,
				address: {
					district: values.district,
					wards: values.wards,
					city: values.city,
					address: values.address,
				},
				phone: +values.phone,
				email: values.email,
			});
			if (res?.data) {
				toast.success("Tạo mới đối tác thành công");
				handleClose();
			} else {
				toast.error("Tạo mới đối tác thất bại");
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
						<h2>Tạo đối tác mới</h2>
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
														Tên đối tác
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
													<Form.Label>
														Điện thoại
													</Form.Label>
													<Form.Control
														type="number"
														name="phone"
														value={
															formik.values.phone
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
														Email
													</Form.Label>
													<Form.Control
														type="text"
														name="email"
														value={
															formik.values.email
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
														Địa chỉ cụ thể
													</Form.Label>
													<Form.Control
														type="text"
														name="address"
														value={
															formik.values
																.address
														}
														onChange={
															formik.handleChange
														}
													/>
													{formik.errors.address &&
														formik.touched
															.address && (
															<p className="error mb-0">
																{
																	formik
																		.errors
																		.address as string
																}
															</p>
														)}
												</Form.Group>
											</Col>

											<Form
												onSubmit={formik.handleSubmit}
											>
												<FormAddress
													city={formik.values.city}
													district={
														formik.values.district
													}
													wards={formik.values.wards}
													onCityChange={(
														value: any
													) =>
														formik.setFieldValue(
															"city",
															value
														)
													}
													onDistrictChange={(
														value: any
													) =>
														formik.setFieldValue(
															"district",
															value
														)
													}
													onWardsChange={(
														value: any
													) =>
														formik.setFieldValue(
															"wards",
															value
														)
													}
												/>
											</Form>

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

export default CreateShipper;
