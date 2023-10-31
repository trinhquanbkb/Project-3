import React from 'react';
import { Form, Row, Col, Button } from "react-bootstrap";

const UpdateCustomer = (props: any) => {

    return (
        <>
            <div className={`popup-info ${props ? 'opened' : ''}`}>
                <div className="popup-info-inner">
                    <div className='title-popup'>Cập nhật thông tin khách hàng <span className='close' onClick={props.handleClose}></span></div>
                    <div className="popup-inner">
                        <div className="id-customer">ID Khách hàng <span>BQZV</span></div>
                        <Form>
                            <Row>
                                <Col xs={12} md={6} className="mb-3">
                                    <Form.Group>
                                        <Form.Label>Họ và tên</Form.Label>
                                        <Form.Control type="text" placeholder="Nguyễn Thanh Tuyền" />
                                    </Form.Group>
                                </Col>

                                <Col xs={12} md={6} className="mb-3">
                                    <Form.Group>
                                        <Form.Label>Nickname</Form.Label>
                                        <Form.Control type="text" placeholder="Nguyễn Thanh Tuyền" />
                                    </Form.Group>
                                </Col>

                                <Col xs={12} md={6} className="mb-3">
                                    <Form.Group>
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control type="email" placeholder="thanhtuyen@dpcargo.com" />
                                    </Form.Group>
                                </Col>

                                <Col xs={12} md={6} className="mb-3">
                                    <Form.Group>
                                        <Form.Label>Địa chỉ</Form.Label>
                                        <Form.Control type="text" placeholder="203 Nguyễn Huy Tưởng, Thanh Xuân, Hà Nội" />
                                    </Form.Group>
                                </Col>

                                <Col xs={12} md={6} className="mb-3">
                                    <Form.Group>
                                        <Form.Label>Số điện thoại</Form.Label>
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
                                        <Row>
                                            <Col xs={12} md={4}>
                                                <Form.Label>Số dư hiện tại</Form.Label>
                                                <Form.Control type="number" value="-2000000" />
                                            </Col>
                                            <Col xs={12} md={4}>
                                                <Form.Label>Đã thanh toán</Form.Label>
                                                <Form.Control type="number" value="-2000000" />
                                            </Col>
                                            <Col xs={12} md={4}>
                                                <Form.Label>Tổng tiền đã nạp</Form.Label>
                                                <Form.Control type="number" value="-2000000" />
                                            </Col>
                                        </Row>
                                    </Form.Group>
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
                                    <Form.Label>Sale phụ trách</Form.Label>
                                    <Form.Select aria-label="Default select example">
                                        <option>ABC</option>
                                        <option value="1">One</option>
                                        <option value="2">Two</option>
                                        <option value="3">Three</option>
                                    </Form.Select>
                                </Col>

                                <Col xs={12} md={6} className="mb-3">
                                    <Form.Group>
                                        <Form.Label>Mật khẩu <span className='requied'>*</span></Form.Label>
                                        <Form.Control required type="password" placeholder="Nhập mật khẩu" />
                                    </Form.Group>
                                </Col>

                                <Col xs={12} className="mb-3">
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
                                        <i className="uil uil-plus-square me-1"></i> Cập nhật
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

export default UpdateCustomer;