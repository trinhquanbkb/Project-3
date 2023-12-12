import { Row, Col, Button, Form } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import {
	useCreateReceiptMutation
} from "../../../api/receiptApi";
import FormAddress from "../../../components/FormAddress";
import { useEffect, useState } from "react";
import { getRequest } from "../../../api/baseApi";

type ProdutType = {
	name: string;
	quantity: number;
	price: number;
	total: number;
	productItemId: string;
	weight: number;
	category: string
}

const productDefult = {
	"name": "",
	"quantity": 0,
	"price": 0,
	"total": 0,
	"weight": 0,
	"productItemId": "",
	"category": ""
}

const CreateReceipt = ({
	handleClose,
	isClass,
}: {
	handleClose: () => void;
	isClass: string;
}) => {
	const [createReceipt] = useCreateReceiptMutation();
	const [products, setProducts] = useState<Array<ProdutType>>([{ ...productDefult }])
	const [supplier, setSupplier] = useState<Array<any>>([])
	const [warehose, setWarehose] = useState<Array<any>>([])
	const [category, setCategory] = useState<Array<any>>([])


	useEffect(() => {
		getRequest('/suppliers', "pageSize=10&page=1")
			.then(data => setSupplier(data.data))
		getRequest('/warehouses', "pageSize=10&page=1")
			.then(data => setWarehose(data.data))
		getRequest('/categories', "pageSize=10&page=1")
			.then(data => setCategory(data.data))
	}, [])

	const formik = useFormik({
		initialValues: {
			weight: 0,
			supplierId: "",
			note: "",
			status: "",
			warehouseId: "",
			products: []
		},
		onSubmit: async (values: any) => {
			const res: any = await createReceipt(
				{
					weight: products.reduce((accumulator: any, currentValue: any) => {
						const weight = currentValue.weight || 0;

						return accumulator + weight;
					}, 0),
					supplierId: values.supplierId,
					warehouseId: values.warehouseId,
					note: values.note,
					status: "Thành công",
					products: products.map(p => ({
						...p,
						total: p.price * p.quantity
					}))
				}
			);
			if (res?.data) {
				toast.success("Tạo mới nhà kho thành công");
				handleClose();
			} else {
				toast.error("Tạo mới nhà kho thất bại");
			}

		},
	});

	return (
		<>
			<div
				className={`popup-info main-view-order ${isClass === "active" ? "opened" : ""
					}`}
			>
				<div className="popup-info-inner">
					<div className="title-popup">
						<h2>Tạo nhà kho mới</h2>
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
														Đối tác
													</Form.Label>
													<Form.Select
														name="supplierId"
														value={formik.values.supplierId}
														onChange={formik.handleChange}

													>
														{supplier.map(s => <option value={s?._id}>{s.name}</option>)}
													</Form.Select>
												</Form.Group>
											</Col>
											<Col xs={12} md={6}>
												<Form.Group className="mb-3">
													<Form.Label>
														Nhập về kho
													</Form.Label>
													<Form.Select
														name="warehouseId"
														value={formik.values.warehouseId}
														onChange={formik.handleChange}

													>
														{warehose.map(s => <option value={s?._id}>{s.name}</option>)}

													</Form.Select>
												</Form.Group>
											</Col>
											<Col xs={12} md={6}>
												<Form.Group className="mb-3">
													<Form.Label>
														Ghi chú
													</Form.Label>
													<Form.Control
														type="text"
														name="note"
														value={
															formik.values.note
														}
														onChange={
															formik.handleChange
														}
													/>
												</Form.Group>
											</Col>
											<Col xs={12} md={12}>
												<Form.Group className="mb-3">
													<Form.Label>
														Sản phẩm
													</Form.Label>
													{
														products.map((p: ProdutType, index: any) => (
															<div key={index} style={{ display: 'flex', justifyContent: 'space-between', paddingTop: 4 }}>
																<div>
																	<p>Tên</p>
																	<input
																		value={p.name}
																		onChange={(e) =>
																			setProducts((prev) => {
																				let data = [...prev]; // Make a copy of the array
																				data[index].name = e.target.value;
																				return data;
																			})
																		}
																	/>
																</div>
																<div>
																	<p>Cân nặng</p>
																	<input
																		value={p.weight}
																		onChange={(e) =>
																			setProducts((prev) => {
																				let data = [...prev];
																				data[index].weight = +e.target.value;
																				return data;
																			})
																		}
																	/>
																</div>
																<div>
																	<p>Số lượng</p>
																	<input
																		value={p.quantity}
																		onChange={(e) =>
																			setProducts((prev) => {
																				let data = [...prev];
																				data[index].quantity = +e.target.value;
																				return data;
																			})
																		}
																	/>

																</div>
																<div>
																	<p>Giá</p>
																	<input
																		value={p.price}
																		onChange={(e) =>
																			setProducts((prev) => {
																				let data = [...prev];
																				data[index].price = +e.target.value;
																				return data;
																			})
																		}
																	/>
																</div>
																<div>
																	<p>Loại sản phẩm</p>
																	<Form.Select
																		value={p.category}
																		onChange={(e:any) => {
																			setProducts((prev) => {
																				let data = [...prev];
																				data[index].category = "" + e.target.value;
																				return data;
																			});
																		}}
																	>
																		{category.map(s => <option value={s?.name}>{s.name}</option>)}

																	</Form.Select>

																</div>
															</div>
														))
													}

												</Form.Group>
												<Button type="button" onClick={() => setProducts(prev => [...prev, { ...productDefult }])}>Thêm sản phẩm</Button>
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

export default CreateReceipt;

