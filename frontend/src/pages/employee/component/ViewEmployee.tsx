import { Button, Col, Form, Row } from "react-bootstrap";
import Loading from "../../../components/Loading";
import { useGetUserDetailQuery } from "../../../api/userApi";

const ViewEmployee = ({
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

	return (
		<>
			<div
				className={`popup-info main-view-order ${
					isClass === "active" ? "opened" : ""
				}`}
			>
				<div className="popup-info-inner">
					<div className="title-popup">
						<h2>Thông tin nhân viên</h2>
						<span className="close" onClick={handleClose}></span>
					</div>

					{fetchingUser ? (
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
														Mã nhân viên
													</Form.Label>
													<Form.Control
														type="text"
														name="code"
														value={userDetail?._id}
														disabled
													/>
												</Form.Group>
											</Col>
											<Col xs={12} md={6}>
												<Form.Group className="mb-3">
													<Form.Label>
														Tên nhân viên
													</Form.Label>
													<Form.Control
														type="text"
														name="username"
														value={
															userDetail?.username
														}
														disabled
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
															userDetail?.email
														}
														disabled
													/>
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
														value={
															userDetail?.phone
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

export default ViewEmployee;
