import React from 'react';
import { Row, Col, Button, Form } from "react-bootstrap";

const EditUser = (props: any) => {
    return (
        <>
            <div className={`info-user ${props ? 'opened' : ''}`}>
                <div className="info-user-inner">
                    <div className='title-info-user'>Sửa nhân viên</div>
                    <Form>
                        <Row>
                            <Col xs={12} md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Mã nhân viên</Form.Label>
                                    <Form.Control type="text" placeholder="DPUS21062300087" />
                                </Form.Group>
                            </Col>
                            <Col xs={12} md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Họ và tên</Form.Label>
                                    <Form.Control type="text" placeholder="Nguyễn Thanh Tuyền" />
                                </Form.Group>
                            </Col>

                            <Col xs={12} md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Số điện thoại</Form.Label>
                                    <Form.Control type="tel" placeholder="dpcargo161@gmail.com" />
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
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control type="email" placeholder="thanhtuyen@dpcargo.com" />
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

                            <Col className='text-center'>
                                <Button variant="primary" type="submit">
                                    Cập nhật
                                </Button>
                            </Col>
                        </Row>
                    </Form>
                </div>
            </div>
        </>
    );
};

export default EditUser;