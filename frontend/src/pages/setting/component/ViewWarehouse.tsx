import { Button, Col, Form, Row } from "react-bootstrap";
import Loading from "../../../components/Loading";
import { useGetWarehouseDetailQuery } from "../../../api/warehouseApi";

const ViewWarehouse = ({
	id,
	handleClose,
	isClass,
}: {
	id: string;
	handleClose: () => void;
	isClass: string;
}) => {
	const { data: warehouseDetail, isFetching: fetchingWarehouse } =
		useGetWarehouseDetailQuery(id);

	return (
		<>
			<div
				className={`popup-info main-view-order ${
					isClass === "active" ? "opened" : ""
				}`}
			>
				<div className="popup-info-inner">
					<div className="title-popup">
						<h2>Thông tin nhà kho</h2>
						<span className="close" onClick={handleClose}></span>
					</div>

					{fetchingWarehouse ? (
						<Loading />
					) : (
						<div className="popup-inner view-order">
							<div className="content-order-detail">
								<div className="wrap-order-detail w-100">
									<div className="order-detail">
										<Row>
											<Col xs={12} md={6}>
												<Form.Group className="mb-3">
													<Form.Label>
														Mã nhà kho
													</Form.Label>
													<Form.Control
														type="text"
														name="code"
														value={warehouseDetail?._id}
														disabled
													/>
												</Form.Group>
											</Col>
											<Col xs={12} md={6}>
												<Form.Group className="mb-3">
													<Form.Label>
														Tên nhà kho
													</Form.Label>
													<Form.Control
														type="text"
														name="name"
														value={
															warehouseDetail?.name
														}
														disabled
													/>
												</Form.Group>
											</Col>
											<Col xs={12} md={6}>
												<Form.Group className="mb-3">
													<Form.Label>
														Đường
													</Form.Label>
													<Form.Control
														type="text"
														name="address"
														value={
															warehouseDetail?.address?.address
														}
														disabled
													/>
												</Form.Group>
											</Col>
											<Col xs={12} md={6}>
												<Form.Group className="mb-3">
													<Form.Label>
														Phường/Xã
													</Form.Label>
													<Form.Control
														type="text"
														name="wards"
														value={
															warehouseDetail?.address?.wards
														}
														disabled
													/>
												</Form.Group>
											</Col>
											<Col xs={12} md={6}>
												<Form.Group className="mb-3">
													<Form.Label>
														Quận/Huyện
													</Form.Label>
													<Form.Control
														type="text"
														name="district"
														value={
															warehouseDetail?.address?.district
														}
														disabled
													/>
												</Form.Group>
											</Col>
											<Col xs={12} md={6}>
												<Form.Group className="mb-3">
													<Form.Label>
														Thành phố
													</Form.Label>
													<Form.Control
														type="text"
														name="district"
														value={
															warehouseDetail?.address?.city
														}
														disabled
													/>
												</Form.Group>
											</Col>
										</Row>
									</div>
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

export default ViewWarehouse;
