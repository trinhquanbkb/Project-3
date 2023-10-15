import { Row, Col, Button, Form } from "react-bootstrap";

const AddCustomer = (props: any) => {

    return (
        <>
            <div className={`popup-info ${props ? 'opened' : ''}`} >
                <div className="popup-info-inner">
                    <div className='title-popup'>Thêm khách hàng <span className='close' onClick={props.handleClose}></span></div>
                    <div className="popup-inner">
                        <div className="id-customer">ID Khách hàng <span>BQZV</span></div>
                        <Form>
                            <Row>
                                <Col xs={12} md={6} className="mb-3">
                                    <Form.Group>
                                        <Form.Label>Họ và tên <span className='required'>*</span></Form.Label>
                                        <Form.Control type="text" placeholder="Họ và tên nhân viên" />
                                    </Form.Group>
                                </Col>

                                <Col xs={12} md={6} className="mb-3">
                                    <Form.Group>
                                        <Form.Label>Nickname</Form.Label>
                                        <Form.Control type="text" placeholder="ABC" />
                                    </Form.Group>
                                </Col>

                                <Col xs={12} md={6} className="mb-3">
                                    <Form.Group>
                                        <Form.Label>Số điện thoại <span className='required'>*</span></Form.Label>
                                        <Form.Control type="tel" placeholder="012345678" />
                                    </Form.Group>
                                </Col>

                                <Col xs={12} md={6} className="mb-3">
                                    <Form.Label>Giới tính</Form.Label>
                                    <Form.Group className="popup-check">
                                        <Form.Check
                                            inline
                                            label="Nam"
                                            name="sex"
                                            type="radio"
                                            id="type-male"
                                        />
                                        <Form.Check
                                            inline
                                            label="Nữ"
                                            name="sex"
                                            type="radio"
                                            id="type-female"
                                        />
                                    </Form.Group>
                                </Col>

                                <Col xs={12} md={6} className="mb-3">
                                    <Form.Group>
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control type="email" placeholder="Email" />
                                    </Form.Group>
                                </Col>

                                <Col xs={12} md={6} className="mb-3">
                                    <Form.Group>
                                        <Form.Label>Địa chỉ</Form.Label>
                                        <Form.Control type="text" placeholder="Tỉnh thành, Quận huyện, Thị xã" />
                                    </Form.Group>
                                </Col>

                                <Col xs={12} md={6} className="mb-3">
                                    <Form.Label>Sale phụ trách</Form.Label>
                                    <Form.Select aria-label="Default select example">
                                        <option>ABC</option>
                                        <option value="1">One</option>
                                        <option value="2">Two</option>
                                        <option value="3">Three</option>
                                    </Form.Select>
                                </Col>

                                <Col xs={12} md={6} className="mb-3">
                                    <Form.Label>Cho phép công nợ</Form.Label>
                                    <Form.Group className="popup-check">
                                        <Form.Check
                                            inline
                                            label="Có"
                                            name="allow"
                                            type="radio"
                                            id="allow"
                                        />
                                        <Form.Check
                                            inline
                                            label="Không"
                                            name="allow"
                                            type="radio"
                                            id="not-allow"
                                        />
                                    </Form.Group>
                                </Col>

                                <Col xs={12} md={6} className="mb-3">
                                    <Form.Group>
                                        <Form.Label>Mật khẩu <span className='required'>*</span></Form.Label>
                                        <Form.Control type="password" placeholder="Nhập mật khẩu" />
                                    </Form.Group>
                                </Col>

                                <Col xs={12} md={6} className="mb-3">
                                    <Form.Group>
                                        <Form.Label>Ghi chú</Form.Label>
                                        <Form.Control type="text" placeholder="Nhập ghi chú" />
                                    </Form.Group>
                                </Col>

                                <Col className='text-center'>
                                    <Button variant="outline-primary mx-2 fw-medium" type="submit">
                                        <i className="uil uil-plus-square me-1"></i> Hủy bỏ
                                    </Button>
                                    <Button variant="primary mx-2 fw-medium" type="submit">
                                        <i className="uil uil-plus-square me-1"></i> Xác nhận
                                    </Button>
                                </Col>
                            </Row>
                        </Form>
                    </div>
                </div>
                <div className={`popup-overlay ${props.isClass}`} onClick={props.handleClose}></div>
            </div>
        </>
    );
};

export default AddCustomer;