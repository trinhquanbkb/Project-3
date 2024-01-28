import React, { useEffect, useState } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import { getRequest } from "../../../api/baseApi";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useExportDeliveryBillMutation } from "../../../api/deliveryBillApi";
import { toast } from "react-toastify";

const ModalExport = (props: any) => {
	const [shipping, setShipping] = useState([]);
	const [exportApi] = useExportDeliveryBillMutation();
	useEffect(() => {
		getRequest("/Shippings", "pageSize=1000&page=1").then((data) => {
			setShipping(data.data);
		});
	}, []);

	const formik = useFormik({
		initialValues: {
			shipping_id: "",
			tracking: "",
			shippingFee: 0,
		},
		validationSchema: Yup.object({
			shipping_id: Yup.string().required("Trường bắt buộc!"),
			tracking: Yup.string().required("Trường bắt buộc!"),
			shippingFee: Yup.number().required("Trường bắt buộc!"),
		}),
		onSubmit: async (values: any) => {
			const res = await exportApi({
				id: props.id,
				...values,
			});
			if (res) {
				toast.success("Xuất hàng thành công!");
				props.handleAction();
			} else {
				toast.error("Server: Lỗi xử lý!");
			}
		},
	});

	return (
		<>
			<Modal
				{...props}
				size="md"
				aria-labelledby="contained-modal-title-vcenter"
				centered
				className="modal-delete-tracking "
			>
				<Modal.Header className="text-center justify-content-center">
					<Modal.Title
						style={{ fontSize: "20px", wordBreak: "break-word" }}
					>
						{props.content}
					</Modal.Title>
				</Modal.Header>
				<Modal.Footer className="d-flex justify-content-start flex-column">
					<Form className="w-100">
						<div className="order-detail d-flex justify-content-start flex-column w-100">
							<Row>
								<Col xs={12} md={12}>
									<Form.Group className="mb-3">
										<Form.Label>
											Đối tác vận chuyển
										</Form.Label>
										<Form.Select
											name="shipping_id"
											value={formik.values.shipping_id}
											onChange={(e: any) => {
												formik.setValues({
													...formik.values,
													shipping_id: e.target.value,
												});
											}}
										>
											<option value={""}>Chọn</option>
											{shipping.map((s: any) => (
												<option value={s?._id}>
													{s?.name}
												</option>
											))}
										</Form.Select>
										{formik.errors.shipping_id &&
											formik.touched.shipping_id && (
												<p className="error mb-0">
													{
														formik.errors
															.shipping_id as string
													}
												</p>
											)}
									</Form.Group>
								</Col>
								<Col xs={12} md={6}>
									<Form.Group className="mb-3">
										<Form.Label>Mã tracking</Form.Label>
										<Form.Control
											type="text"
											name="tracking"
											value={formik.values.tracking}
											onChange={formik.handleChange}
										/>
									</Form.Group>
									{formik.errors.tracking &&
										formik.touched.tracking && (
											<p className="error mb-0">
												{
													formik.errors
														.tracking as string
												}
											</p>
										)}
								</Col>
								<Col xs={12} md={6}>
									<Form.Group className="mb-3">
										<Form.Label>Phí vận chuyển</Form.Label>
										<Form.Control
											type="number"
											name="shippingFee"
											value={formik.values.shippingFee}
											onChange={formik.handleChange}
										/>
									</Form.Group>
									{formik.errors.shippingFee &&
										formik.touched.shippingFee && (
											<p className="error mb-0">
												{
													formik.errors
														.shippingFee as string
												}
											</p>
										)}
								</Col>
							</Row>
						</div>
					</Form>
					<Button
						variant="primary"
						onClick={async () => {
							formik.handleSubmit();
							props.handleClick();
						}}
						disabled={props.buttonDisabled}
					>
						<span className="mr-5">Xác nhận xuất kho</span>
						<i className="uil uil-check"></i>
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
};

export default ModalExport;
