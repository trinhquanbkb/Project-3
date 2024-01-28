import { Button, Col, Form, Row } from "react-bootstrap";
import Loading from "../../../components/Loading";
import { useGetReceiptDetailQuery } from "../../../api/receiptApi";
import { convertDate } from "../../../utils/function";

const ViewReceipt = ({
	id,
	handleClose,
	isClass,
}: {
	id: string;
	handleClose: () => void;
	isClass: string;
}) => {
	const { data, isFetching } = useGetReceiptDetailQuery(id);

	return (
		<>
			<div
				className={`popup-info main-view-order ${
					isClass === "active" ? "opened" : ""
				}`}
			>
				<div className="popup-info-inner">
					<div className="title-popup">
						<h2>Thông tin chi tiết phiếu nhập kho</h2>
						<span className="close" onClick={handleClose}></span>
					</div>

					{isFetching ? (
						<Loading />
					) : (
						<div className="popup-inner view-order">
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
														<Form.Control
															name="supplierId"
															value={
																data?.supplierId
																	.name
															}
														></Form.Control>
													</Form.Group>
												</Col>
												<Col xs={12} md={6}>
													<Form.Group className="mb-3">
														<Form.Label>
															Nhập về kho
														</Form.Label>
														<Form.Control
															name="warehouseId"
															value={
																data
																	?.warehouseId
																	.name
															}
														></Form.Control>
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
															value={data?.note}
														/>
													</Form.Group>
												</Col>
												<Col xs={12} md={6}>
													<Form.Group className="mb-3">
														<Form.Label>
															Ngày tạo
														</Form.Label>
														<Form.Control
															type="text"
															value={convertDate(
																data?.createdAt
															)}
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
																		width: "40%",
																	}}
																>
																	Sản phẩm
																</th>
																<th
																	style={{
																		width: "13%",
																	}}
																>
																	Đơn vị tính
																</th>
																<th
																	style={{
																		width: "13%",
																	}}
																>
																	Số lượng{" "}
																</th>
																<th
																	style={{
																		width: "13%",
																	}}
																>
																	Giá nhập/sản
																	phẩm
																</th>
																<th
																	style={{
																		width: "13%",
																	}}
																>
																	Ngày hết hạn
																</th>
																<th></th>
															</tr>
														</thead>
														<tbody>
															{data?.products.map(
																(
																	row,
																	index
																) => (
																	<tr
																		key={
																			index
																		}
																	>
																		<td>
																			{index +
																				1}
																		</td>
																		<td>
																			<input
																				className="form-control"
																				type="text"
																				value={
																					row
																						.product_id
																						.product_name
																				}
																			/>
																		</td>
																		<td>
																			<input
																				className="form-control"
																				type="text"
																				value={
																					row.weight
																				}
																			/>
																		</td>
																		<td>
																			<input
																				className="form-control"
																				type="text"
																				value={
																					row.quantity
																				}
																			/>
																		</td>
																		<td>
																			<input
																				className="form-control"
																				type="text"
																				value={
																					row.price
																				}
																			/>
																		</td>
																		<td>
																			{row.expriry_data ? (
																				<input
																					className="form-control"
																					type="date"
																					value={
																						row.expriry_data
																					}
																				/>
																			) : (
																				<input
																					className="form-control"
																					type="text"
																					value="Không có"
																				/>
																			)}
																		</td>
																	</tr>
																)
															)}
														</tbody>
													</table>
												</div>
											</Row>
										</div>
									</Form>
								</div>
								<div className="btn-bottom">
									<Button
										variant="outline-primary mx-2 fw-medium"
										onClick={handleClose}
									>
										<i className="uil uil-times me-1"></i>{" "}
										Đóng
									</Button>
								</div>
							</div>
						</div>
					)}
				</div>
				<div
					className={`popup-overlay ${isClass}`}
					onClick={handleClose}
				></div>
			</div>
		</>
	);
};

export default ViewReceipt;
