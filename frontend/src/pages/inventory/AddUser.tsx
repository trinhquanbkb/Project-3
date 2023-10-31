import React from 'react';
import { Row, Col, Button, Form } from "react-bootstrap";

const AddUser = (props: any) => {

    return (
        <>
            <div className={`info-user ${props ? 'opened' : ''}`} >
                <div className="info-user-inner">
                    <div className='title-info-user'>Thêm nhân viên</div>
                    <Form>
                        <Row>
                            <Col xs={12} md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Họ và tên <span className='requied'>*</span></Form.Label>
                                    <Form.Control type="text" placeholder="Họ và tên nhân viên" />
                                </Form.Group>
                            </Col>

                            <Col xs={12} md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Số điện thoại <span className='requied'>*</span></Form.Label>
                                    <Form.Control type="tel" placeholder="Số điện thoại" />
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
                                    <Form.Label>Mật khẩu <span className='requied'>*</span></Form.Label>
                                    <Form.Control type="password" placeholder="Nhập mật khẩu" />
                                </Form.Group>
                            </Col>

                            <Col xs={12} md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Xác nhận mật khẩu <span className='requied'>*</span></Form.Label>
                                    <Form.Control type="password" placeholder="Nhập mật khẩu" />
                                </Form.Group>
                            </Col>

                            <Col>
                                <Button variant="primary" type="submit">
                                    Thêm nhân viên
                                </Button>
                            </Col>
                        </Row>
                    </Form>
                </div>
            </div>
        </>
    );
};

export default AddUser;