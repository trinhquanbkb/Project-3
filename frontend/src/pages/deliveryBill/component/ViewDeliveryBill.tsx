import { Button, Col, Form, Row } from "react-bootstrap";
import Loading from "../../../components/Loading";
import { convertDate } from "../../../utils/function";
import { useGetDeliveryBillDetailQuery } from "../../../api/deliveryBillApi";
import { NumericFormat } from "react-number-format";

const ViewDeliveryBill = ({
	id,
	handleClose,
	isClass,
}: {
	id: string;
	handleClose: () => void;
	isClass: string;
}) => {
	const { data, isFetching } = useGetDeliveryBillDetailQuery(id);
	let index = 0;

	const renderTotalMoney = () => {
		let total = 0;
		data?.products.forEach((item) => {
			item.product_item.forEach((pr) => {
				total += (pr.priceSold || 0) * (pr.quantity || 0);
			});
		});
		return total + (data?.shippingFee || 0);
	};
	return (
		<>
			<div
				className={`popup-info main-view-order ${
					isClass === "active" ? "opened" : ""
				}`}
			>
				<div className="popup-info-inner">
					<div className="title-popup">
						<h2>Thông tin chi tiết phiếu xuất kho</h2>
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
															Người gửi
														</Form.Label>
														<Form.Control
															className="form-input-disabled"
															name="sender"
															value={data?.sender}
															disabled={true}
														></Form.Control>
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
																data?.receiver
															}
														></Form.Control>
													</Form.Group>
												</Col>
												<Col xs={12} md={6}>
													<Form.Group className="mb-3">
														<Form.Label>
															Trạng thái
														</Form.Label>
														<Form.Control
															type="text"
															value={data?.status}
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
												<Col xs={12} md={6}>
													<Form.Group className="mb-3">
														<Form.Label>
															Địa chỉ
														</Form.Label>
														<Form.Control
															name="address"
															value={
																data?.address
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
															Đơn vị vận chuyển
														</Form.Label>
														<Form.Control
															type="text"
															name="shipping"
															value={
																data
																	?.shipping_id
																	.name
															}
														/>
													</Form.Group>
												</Col>
												<Col xs={12} md={6}>
													<Form.Group className="mb-3">
														<Form.Label>
															Mã tracking
														</Form.Label>
														<Form.Control
															type="text"
															name="tracking"
															value={
																data?.tracking
															}
														/>
													</Form.Group>
												</Col>
												<Col xs={12} md={6}>
													<Form.Group className="mb-3">
														<Form.Label>
															Phí vận chuyển
														</Form.Label>
														<Form.Control
															type="number"
															name="shippingFee"
															value={
																data?.shippingFee ||
																0
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
																		width: "25%",
																	}}
																>
																	Mã sản phẩm
																</th>
																<th
																	style={{
																		width: "25%",
																	}}
																>
																	Tên sản phẩm
																</th>
																<th
																	style={{
																		width: "22%",
																	}}
																>
																	Số lượng
																	xuất hàng
																</th>
																<th
																	style={{
																		width: "22%",
																	}}
																>
																	Giá xuất/sản
																	phẩm
																</th>
															</tr>
														</thead>
														<tbody>
															{data?.products.map(
																(item) => {
																	return item.product_item.map(
																		(
																			row
																		) => (
																			<tr
																				key={
																					index +
																					1
																				}
																			>
																				<td>
																					{index +
																						1}
																				</td>
																				<td>
																					<input
																						type="text"
																						className="form-control"
																						value={
																							row.product_item_id
																						}
																					/>
																				</td>
																				<td>
																					<input
																						type="text"
																						className="form-control"
																						value={
																							item
																								.product_id
																								.product_name
																						}
																					/>
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
																					<input
																						type="number"
																						className="form-control"
																						value={
																							row.priceSold
																						}
																						disabled
																					/>
																				</td>
																			</tr>
																		)
																	);
																}
															)}
														</tbody>
													</table>
												</div>
											</Row>
											<p className="text-danger fs-3">
												Tổng tiền:{" "}
												<NumericFormat
													value={
														renderTotalMoney() || 0
													}
													thousandSeparator=","
													displayType="text"
													suffix=" đ"
												/>
											</p>
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

export default ViewDeliveryBill;
