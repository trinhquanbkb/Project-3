import { Row, Col, Button, Form } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { useCreateReceiptMutation } from "../../../api/receiptApi";
import { useEffect, useState } from "react";
import { getRequest } from "../../../api/baseApi";
import SearchProduct from "../../../components/SearchProduct";

type ProdutType = {
	id: number;
	expriry_data: string;
	quantity: number;
	price: number;
	productItemId: any;
	weight: number;
};

const productDefault = {
	id: 1,
	quantity: 0,
	price: 0,
	weight: 0,
	expriry_data: "",
	productItemId: "",
};

const CreateReceipt = ({
	handleClose,
	isClass,
}: {
	handleClose: () => void;
	isClass: string;
}) => {
	const [createReceipt] = useCreateReceiptMutation();
	const [products, setProducts] = useState<Array<ProdutType>>([
		{ ...productDefault },
	]);
	const [supplier, setSupplier] = useState<Array<any>>([]);
	const [warehose, setWarehose] = useState<Array<any>>([]);

	const [rows, setRows] = useState<Array<ProdutType>>([
		{ ...productDefault },
	]);
	const addRow = () => {
		setRows((prevRows: Array<ProdutType>) => [
			...prevRows,
			{
				id: prevRows.length + 1,
				quantity: 0,
				price: 0,
				weight: 0,
				productItemId: "",
				expriry_data: "",
			},
		]);
	};

	const deleteRow = (id: number) => {
		let listNew: Array<ProdutType> = [];
		let i = 0;
		if (rows.length > 1) {
			rows.forEach((item) => {
				if (i !== id && i < id) {
					listNew.push(item);
				} else if (i !== id && i > id) {
					listNew.push({ ...item, id: item.id - 1 });
				}
				i++;
			});
			setRows([...listNew]);
		}
	};

	useEffect(() => {
		getRequest("/suppliers", "pageSize=1000&page=1").then((data) => {
			setSupplier(data.data);
		});
		getRequest("/warehouses", "pageSize=1000&page=1").then((data) =>
			setWarehose(data.data)
		);
	}, []);

	const formik = useFormik({
		initialValues: {
			supplierId: "",
			note: "",
			warehouseId: "",
			products: [],
		},
		validationSchema: Yup.object({
			supplierId: Yup.string().required("Trường bắt buộc!"),
			warehouseId: Yup.string().required("Trường bắt buộc!"),
		}),
		onSubmit: async (values: any) => {
			let validate = true;
			let idRowNull = null;
			rows.forEach((item) => {
				if (!item.productItemId) {
					validate = false;
					idRowNull = item.id;
				}
			});
			if (validate) {
				const res: any = await createReceipt({
					supplierId: values.supplierId,
					warehouseId: values.warehouseId,
					note: values.note,
					products: rows.map((p) => ({
						expriry_data: p.expriry_data,
						quantity: p.quantity,
						price: p.price,
						product_id: p.productItemId,
						weight: p.weight,
					})),
				});
				if (res?.data) {
					toast.success("Tạo thông tin phiếu nhập kho thành công");
					handleClose();
				} else {
					toast.error("Tạo thông tin phiếu nhập kho thất bại");
				}
			} else {
				toast.warning(
					`Cần điền đầy đủ thông tin cho sản phẩm hàng thứ ${idRowNull}`
				);
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
						<h2>Tạo phiếu nhập kho</h2>
						<span className="close" onClick={handleClose}></span>
					</div>

					<div className="popup-inner main-edit-order view-order main-create-order">
						<div className="content-order-detail">
							<div className="wrap-order-detail w-100">
								<Form>
									<div className="order-detail">
										<Row>
											<Col xs={12} md={6}>
												<Form.Group className="mb-3">
													<Form.Label>
														Đối tác
													</Form.Label>
													<Form.Select
														name="supplierId"
														value={
															formik.values
																.supplierId
														}
														onChange={(e: any) => {
															formik.setValues({
																...formik.values,
																supplierId:
																	e.target
																		.value,
															});
														}}
													>
														<option value={""}>
															Chọn
														</option>
														{supplier.map((s) => (
															<option
																value={s?._id}
															>
																{s.name}
															</option>
														))}
													</Form.Select>
													{formik.errors.supplierId &&
														formik.touched
															.supplierId && (
															<p className="error mb-0">
																{
																	formik
																		.errors
																		.supplierId as string
																}
															</p>
														)}
												</Form.Group>
											</Col>
											<Col xs={12} md={6}>
												<Form.Group className="mb-3">
													<Form.Label>
														Nhập về kho
													</Form.Label>
													<Form.Select
														name="warehouseId"
														value={
															formik.values
																.warehouseId
														}
														onChange={(e: any) => {
															formik.setValues({
																...formik.values,
																warehouseId:
																	e.target
																		.value,
															});
														}}
													>
														<option value={""}>
															Chọn
														</option>
														{warehose.map((s) => (
															<option
																value={s?._id}
															>
																{s.name}
															</option>
														))}
													</Form.Select>

													{formik.errors
														.warehouseId &&
														formik.touched
															.warehouseId && (
															<p className="error mb-0">
																{
																	formik
																		.errors
																		.warehouseId as string
																}
															</p>
														)}
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
											<div className="popup-inner view-order px-2">
												<table
													role="table"
													className="table table-centered react-table table-custom table-tracking"
												>
													<thead>
														<tr>
															<th
																style={{
																	width: "5%",
																}}
															>
																STT
															</th>
															<th
																style={{
																	width: "20%",
																}}
															>
																Sản phẩm
															</th>
															<th
																style={{
																	width: "12%",
																}}
															>
																Cân nặng
															</th>
															<th
																style={{
																	width: "12%",
																}}
															>
																Số lượng{" "}
															</th>
															<th
																style={{
																	width: "12%",
																}}
															>
																Giá
															</th>
															<th
																style={{
																	width: "12%",
																}}
															>
																Ngày hết hạn
															</th>
															<th></th>
														</tr>
													</thead>
													<tbody>
														{rows.map(
															(row, index) => (
																<tr
																	key={row.id}
																>
																	<td>
																		{row.id}
																	</td>
																	<td>
																		<SearchProduct
																			className="basic-single form-search-user form-search-filter"
																			placeholder={
																				"Tìm kiếm theo tên sản phẩm"
																			}
																			handleKeyword={(
																				id: any,
																				value: any
																			) => {
																				setRows(
																					(
																						prevRows
																					) =>
																						prevRows.map(
																							(
																								prevRow
																							) =>
																								prevRow.id ===
																								row.id
																									? {
																											...prevRow,
																											productItemId:
																												id,
																									  }
																									: prevRow
																						)
																				);
																			}}
																			keywordId={
																				row.productItemId
																			}
																		/>
																	</td>
																	<td>
																		<input
																			type="number"
																			value={
																				row.weight
																			}
																			className="form-control"
																			onChange={(
																				e
																			) => {
																				setRows(
																					(
																						prevRows
																					) =>
																						prevRows.map(
																							(
																								prevRow
																							) =>
																								prevRow.id ===
																								row.id
																									? {
																											...prevRow,
																											weight: parseInt(
																												e
																													.target
																													.value
																											),
																									  }
																									: prevRow
																						)
																				);
																			}}
																		/>
																	</td>
																	<td>
																		<input
																			type="number"
																			className="form-control"
																			value={
																				row.quantity
																			}
																			onChange={(
																				e
																			) => {
																				setRows(
																					(
																						prevRows
																					) =>
																						prevRows.map(
																							(
																								prevRow
																							) =>
																								prevRow.id ===
																								row.id
																									? {
																											...prevRow,
																											quantity:
																												Number(
																													e
																														.target
																														.value
																												),
																									  }
																									: prevRow
																						)
																				);
																			}}
																		/>
																	</td>
																	<td>
																		<input
																			type="number"
																			className="form-control"
																			value={
																				row.price
																			}
																			onChange={(
																				e
																			) => {
																				setRows(
																					(
																						prevRows
																					) =>
																						prevRows.map(
																							(
																								prevRow
																							) =>
																								prevRow.id ===
																								row.id
																									? {
																											...prevRow,
																											price: Number(
																												e
																													.target
																													.value
																											),
																									  }
																									: prevRow
																						)
																				);
																			}}
																		/>
																	</td>
																	<td>
																		<input
																			type="date"
																			className="form-control"
																			value={
																				row.expriry_data
																			}
																			onChange={(
																				e
																			) => {
																				setRows(
																					(
																						prevRows
																					) =>
																						prevRows.map(
																							(
																								prevRow
																							) =>
																								prevRow.id ===
																								row.id
																									? {
																											...prevRow,
																											expriry_data:
																												e
																													.target
																													.value,
																									  }
																									: prevRow
																						)
																				);
																			}}
																		/>
																	</td>
																	<td>
																		<button
																			type="button"
																			className="btn btn-delete-tracking btn-delete-tracking-many ms-2"
																			onClick={() =>
																				deleteRow(
																					index
																				)
																			}
																		>
																			<i className="uil uil-multiply"></i>
																			<span className="title ms-1 d-none d-md-inline">
																				Xoá
																				hàng
																			</span>
																		</button>
																	</td>
																</tr>
															)
														)}
													</tbody>
												</table>
												<div className="d-flex justify-content-center w-100 mt-2">
													<button
														type="button"
														className="btn btn-create-tracking btn-create-tracking-many"
														onClick={() => addRow()}
													>
														<i className="uil uil-plus"></i>
														<span className="title ms-1 d-none d-md-inline">
															Thêm hàng
														</span>
													</button>
												</div>
											</div>

											<Col
												xs={12}
												md={12}
												className="text-center mt-3"
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
													onClick={(e) => {
														e.preventDefault();
														formik.handleSubmit();
													}}
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
