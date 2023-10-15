import React from 'react';
import { Row, Col, Button, Form } from "react-bootstrap";

const AddUser = (props: any) => {

    return (
        <>
            <div className={`popup-info ${props ? 'opened' : ''}`} >
                <div className="popup-info-inner">
                    <div className='title-popup'>{props.title || ''} <span className='close' onClick={props.handleClose}></span></div>
                    <div className="popup-inner">
                        <div className="id-customer">Mã nhân viên <span className='required'>*</span> <span className='id'>BQZV</span></div>
                        <Form>
                            <Row>
                                <Col xs={12} md={6}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Họ và tên <span className='required'>*</span></Form.Label>
                                        <Form.Control type="text" placeholder="Họ và tên nhân viên" required />
                                    </Form.Group>
                                </Col>

                                <Col xs={12} md={6}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Số điện thoại <span className='required'>*</span></Form.Label>
                                        <Form.Control type="tel" placeholder="Số điện thoại" required />
                                    </Form.Group>
                                </Col>

                                <Col xs={12} md={6}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control type="email" placeholder="Email" />
                                    </Form.Group>
                                </Col>

                                <Col xs={12} md={6}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Vai trò</Form.Label>
                                        <Form.Control type="text" placeholder="Vai trò" />
                                    </Form.Group>
                                </Col>

                                <Col xs={12} md={6}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Đối tác</Form.Label>
                                        <Form.Control type="text" placeholder="Nhập đối tác" />
                                    </Form.Group>
                                </Col>

                                <Col xs={12} md={6}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Kho VN</Form.Label>
                                        <Form.Control type="text" placeholder="Nhập kho" />
                                    </Form.Group>
                                </Col>

                                <Col xs={12} md={6}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Mật khẩu <span className='required'>*</span></Form.Label>
                                        <Form.Control type="password" placeholder="Nhập mật khẩu" required />
                                    </Form.Group>
                                </Col>

                                <Col xs={12} md={6}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Xác nhận mật khẩu <span className='required'>*</span></Form.Label>
                                        <Form.Control type="password" placeholder="Nhập mật khẩu" required />
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

export default AddUser;