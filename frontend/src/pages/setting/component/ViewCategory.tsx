import { Button, Col, Form, Row } from "react-bootstrap";
import Loading from "../../../components/Loading";
import { useGetProductDetailQuery } from "../../../api/productApi";

const ViewCategory = ({
	id,
	handleClose,
	isClass,
}: {
	id: string;
	handleClose: () => void;
	isClass: string;
}) => {
	const { data: CategoryDetail, isFetching: fetchingCategory } =
		useGetProductDetailQuery(id);

	return (
		<>
			<div
				className={`popup-info main-view-order ${
					isClass === "active" ? "opened" : ""
				}`}
			>
				<div className="popup-info-inner">
					<div className="title-popup">
						<h2>Thông tin danh mục sản phẩm</h2>
						<span className="close" onClick={handleClose}></span>
					</div>

					{fetchingCategory ? (
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
														Mã sản phẩm
													</Form.Label>
													<Form.Control
														type="text"
														name="code"
														value={
															CategoryDetail?._id
														}
														disabled
													/>
												</Form.Group>
											</Col>
											<Col xs={12} md={6}>
												<Form.Group className="mb-3">
													<Form.Label>
														Tên sản phẩm
													</Form.Label>
													<Form.Control
														type="text"
														name="name"
														value={
															CategoryDetail?.product_name
														}
														disabled
													/>
												</Form.Group>
											</Col>

											<Col xs={12} md={6}>
												<Form.Group className="mb-3">
													<Form.Label>Ảnh</Form.Label>
													<div className="img-product">
														<img
															src={
																CategoryDetail?.url
															}
															alt="img-product"
														/>
													</div>
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

export default ViewCategory;
