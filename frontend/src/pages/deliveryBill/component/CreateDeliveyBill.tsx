import { Row, Col, Button, Form } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { getLoggedInUser } from "../../../utils/getLoggedInUser";
import { useSearchProductItemQuery } from "../../../api/productItemApi";
import { useCreateDeliveryBillMutation } from "../../../api/deliveryBillApi";

type ProductType = {
	id: number;
	productId: string;
	expriry_data: string;
	quantity: number;
	quantitySold: number;
	priceSold: number;
	productItemId: any;
	statusError: boolean;
};

type GroupedProductType = {
	product_id: string;
	product_item: {
		product_item_id: string;
		quantity: number;
		priceSold: number;
	}[];
};

const productDefault = {
	id: 1,
	productId: "",
	quantity: 0,
	quantitySold: 0,
	priceSold: 0,
	expriry_data: "",
	productItemId: "",
	statusError: false,
};

const CreateDeliveryBill = ({
	handleClose,
	isClass,
}: {
	handleClose: () => void;
	isClass: string;
}) => {
	const [createDeliveryBill] = useCreateDeliveryBillMutation();
	const [idP, setIdP] = useState<number | null>(null);
	const [codeSearch, setCodeSearch] = useState("");
	const [buttonDisabled, setButtonDisabled] = useState(false);
	const {
		data: dataProductItem,
		isFetching: fetchingProductItem,
		isError: errorFetchProduct,
	} = useSearchProductItemQuery(codeSearch);

	const [rows, setRows] = useState<Array<ProductType>>([
		{ ...productDefault },
	]);
	const addRow = () => {
		setRows((prevRows: Array<ProductType>) => [
			...prevRows,
			{
				id: prevRows.length + 1,
				productId: "",
				quantity: 0,
				quantitySold: 0,
				priceSold: 0,
				productItemId: "",
				expriry_data: "",
				statusError: false,
			},
		]);
	};

	const deleteRow = (id: number) => {
		let listNew: Array<ProductType> = [];
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

	const handleClick = () => {
		if (!buttonDisabled) {
			setButtonDisabled(true);
		}
	};

	const groupProductsByProductId = (
		products: ProductType[]
	): GroupedProductType[] => {
		const groupedProducts: { [key: string]: GroupedProductType } = {};

		products.forEach((product) => {
			const { productId, ...productDetails } = product;

			if (!groupedProducts[productId]) {
				groupedProducts[productId] = {
					product_id: productId,
					product_item: [],
				};
			}

			groupedProducts[productId].product_item.push({
				product_item_id: productDetails.productItemId,
				quantity: productDetails.quantitySold,
				priceSold: productDetails.priceSold,
			});
		});

		return Object.values(groupedProducts);
	};

	const formik = useFormik({
		initialValues: {
			sender: "",
			receiver: "",
			address: "",
			note: "",
		},
		validationSchema: Yup.object({
			address: Yup.string().required("Trường bắt buộc!"),
			receiver: Yup.string().required("Trường bắt buộc!"),
		}),
		onSubmit: async (values: any) => {
			let validate = true;
			let idRowNull = null;
			rows.forEach((item) => {
				if (item.quantitySold > item.quantity && validate) {
					validate = false;
					idRowNull = item.id;
					toast.warning(
						`Sản phẩm hàng thứ ${idRowNull}: số lượng xuất đang nhiều hơn số lượng nhập`
					);
				}
			});
			if (validate) {
				rows.forEach((item) => {
					if (
						!item.productItemId ||
						item.quantitySold <= 0 ||
						item.priceSold <= 0
					) {
						validate = false;
						idRowNull = item.id;
					}
				});
			}

			console.log({
				sender: formik.values.sender,
				receiver: formik.values.receiver,
				address: formik.values.address,
				note: formik.values.note,
				products: groupProductsByProductId(rows),
			});
			if (validate) {
				const res: any = await createDeliveryBill({
					sender: values.sender,
					receiver: values.receiver,
					address: values.address,
					note: values.note,
					products: groupProductsByProductId(rows),
				});
				if (res?.data) {
					toast.success("Tạo thông tin phiếu xuất kho thành công");
					setButtonDisabled(!buttonDisabled);
					handleClose();
				} else {
					toast.error("Tạo thông tin phiếu xuất kho thất bại");
					setButtonDisabled(!buttonDisabled);
				}
			} else {
				toast.warning(
					`Cần điền đầy đủ các thông tin cho sản phẩm hàng thứ ${idRowNull} như: mã sản phẩm, số lượng xuất hàng, giá nhập`
				);
				setButtonDisabled(false);
			}
		},
	});

	useEffect(() => {
		formik.setValues({
			...formik.values,
			sender: getLoggedInUser().warehouse_id.name,
		});
	}, []);

	useEffect(() => {
		if (Object.keys(formik.errors).length === 0) {
			setButtonDisabled(false);
		} else {
			setButtonDisabled(true);
		}
	}, [formik.errors]);

	useEffect(() => {
		if (dataProductItem && idP && !fetchingProductItem) {
			let checkCount = 0;
			rows.forEach((item) => {
				if (item.productItemId === dataProductItem._id) {
					checkCount++;
				}
			});
			if (checkCount >= 2) {
				setRows((prevRows) =>
					prevRows.map((prevRow) =>
						prevRow.id === idP
							? {
									...prevRow,
									productId: "",
									productItemId: "",
									quantity: 0,
									expriry_data: "",
									statusError: true,
							  }
							: prevRow
					)
				);
				setIdP(null);
			} else {
				setRows((prevRows) =>
					prevRows.map((prevRow) =>
						prevRow.id === idP
							? {
									...prevRow,
									productId: dataProductItem.product_id,
									productItemId: dataProductItem._id,
									quantity: dataProductItem.quantity,
									expriry_data: dataProductItem.expriry_data,
									statusError: false,
							  }
							: prevRow
					)
				);
				setIdP(null);
			}
		}
		if (errorFetchProduct && idP) {
			setRows((prevRows) =>
				prevRows.map((prevRow) =>
					prevRow.id === idP
						? {
								...prevRow,
								productId: "",
								productItemId: "",
								quantity: 0,
								expriry_data: "",
								statusError: true,
						  }
						: prevRow
				)
			);
			setIdP(null);
		}
	}, [fetchingProductItem, idP]);

	return (
		<>
			<div
				className={`popup-info main-view-order ${
					isClass === "active" ? "opened" : ""
				}`}
			>
				<div className="popup-info-inner">
					<div className="title-popup">
						<h2>Tạo phiếu xuất kho</h2>
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
														Người gửi
													</Form.Label>
													<Form.Control
														className="form-input-disabled"
														name="sender"
														value={
															formik.values.sender
														}
														disabled={true}
													></Form.Control>
													{formik.errors.sender &&
														formik.touched
															.sender && (
															<p className="error mb-0">
																{
																	formik
																		.errors
																		.sender as string
																}
															</p>
														)}
												</Form.Group>
											</Col>
											<Col xs={12} md={6}>
												<Form.Group className="mb-3">
													<Form.Label>
														Nguời nhận
													</Form.Label>
													<Form.Control
														name="receiver"
														value={
															formik.values
																.receiver
														}
														placeholder="Khách hàng ABC..."
														onChange={
															formik.handleChange
														}
													></Form.Control>
													{formik.errors.receiver &&
														formik.touched
															.receiver && (
															<p className="error mb-0">
																{
																	formik
																		.errors
																		.receiver as string
																}
															</p>
														)}
												</Form.Group>
											</Col>
											<Col xs={12} md={6}>
												<Form.Group className="mb-3">
													<Form.Label>
														Địa chỉ
													</Form.Label>
													<Form.Control
														name="address"
														value={
															formik.values
																.address
														}
														placeholder="Đường 18A, quốc lộ XYZ, đại lộ ABC..."
														onChange={
															formik.handleChange
														}
													></Form.Control>
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
																	width: "6%",
																}}
															>
																STT
															</th>
															<th
																style={{
																	width: "20%",
																}}
															>
																Mã sản phẩm
															</th>
															<th
																style={{
																	width: "15%",
																}}
															>
																Số lượng tồn kho{" "}
															</th>
															<th
																style={{
																	width: "15%",
																}}
															>
																Ngày hết hạn
															</th>
															<th
																style={{
																	width: "22%",
																}}
															>
																Số lượng xuất
																hàng
															</th>
															<th
																style={{
																	width: "22%",
																}}
															>
																Giá xuất
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
																	<td className="d-inline">
																		<input
																			type="search"
																			className="form-control"
																			value={
																				row.productItemId
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
																											productItemId:
																												e
																													.target
																													.value,
																									  }
																									: prevRow
																						)
																				);
																			}}
																			onKeyUp={(
																				e
																			) => {
																				if (
																					e.key ===
																					"Enter"
																				) {
																					setCodeSearch(
																						row.productItemId
																					);
																					setIdP(
																						row.id
																					);
																				}
																			}}
																		/>
																		{row.statusError ? (
																			<span className="text-danger fs-6">
																				Không
																				hợp
																				lệ
																			</span>
																		) : null}
																	</td>
																	<td>
																		<input
																			type="number"
																			value={
																				row.quantity
																			}
																			className="form-control"
																			disabled
																		/>
																	</td>
																	<td>
																		{row.productItemId &&
																		row.expriry_data ? (
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
																		) : row.productItemId &&
																		  !row.expriry_data ? (
																			<input
																				type="text"
																				className="form-control"
																				value={
																					"Không có"
																				}
																				disabled
																			/>
																		) : (
																			<input
																				type="date"
																				className="form-control"
																				disabled
																			/>
																		)}
																	</td>
																	<td>
																		<input
																			type="number"
																			className="form-control"
																			value={
																				row.quantitySold
																			}
																			max={
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
																											quantitySold:
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
																				row.priceSold
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
																											priceSold:
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
										</Row>
									</div>
								</Form>
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
											handleClick();
										}}
										disabled={buttonDisabled}
									>
										<i className="uil uil-check me-1"></i>{" "}
										Xác nhận
									</Button>
								</Col>
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

export default CreateDeliveryBill;
