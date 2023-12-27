import React from "react";
import { Col, Form, Row } from "react-bootstrap";
import { getLoggedInUser } from "../../utils/getLoggedInUser";

export default function UserInfor() {
	const user = getLoggedInUser();
	console.log(user);
	return (
		<div>
			<div className="content-order-detail mt-4">
				<div className="wrap-order-detail w-100">
					<Form>
						<h2 className="mb-3">Thông tin tài khoản</h2>
						<div className="order-detail">
							<Row>
								<Col xs={12} md={6}>
									<Form.Group className="mb-3">
										<Form.Label>Mã nhân sự</Form.Label>
										<Form.Control
											type="text"
											value={user._id}
											disabled
										/>
									</Form.Group>
								</Col>

								<Col xs={12} md={6}>
									<Form.Group className="mb-3">
										<Form.Label>Tên nhân sự</Form.Label>
										<Form.Control
											type="text"
											value={user.username}
											disabled
										/>
									</Form.Group>
								</Col>

								<Col xs={12} md={6}>
									<Form.Group className="mb-3">
										<Form.Label>Email</Form.Label>
										<Form.Control
											type="email"
											value={user.email}
											disabled
										/>
									</Form.Group>
								</Col>

								<Col xs={12} md={6}>
									<Form.Group className="mb-3">
										<Form.Label>Số điện thoại</Form.Label>
										<Form.Control
											type="text"
											value={user.phone}
											disabled
										/>
									</Form.Group>
								</Col>

								<Col xs={12} md={6}>
									<Form.Group className="mb-3">
										<Form.Label>Vai trò</Form.Label>
										<Form.Control
											type="text"
											value={user.role_id.name}
											disabled
										/>
									</Form.Group>
								</Col>

								<Col xs={12} md={6}>
									<Form.Group className="mb-3">
										<Form.Label>Kho trực thuộc</Form.Label>
										<Form.Control
											type="text"
											value={user.warehouse_id.name}
											disabled
										/>
									</Form.Group>
								</Col>
							</Row>
						</div>
					</Form>
				</div>
			</div>
		</div>
	);
}
