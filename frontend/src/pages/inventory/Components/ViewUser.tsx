import React from 'react';
import { Row, Col, Button } from "react-bootstrap";

const ViewUser = (props: any) => {

    return (
        <>
            <div className={`popup-info ${props ? 'opened' : ''}`}>
                <div className="popup-info-inner">
                    <div className='title-popup'>{props.title || ''} <span className='close' onClick={props.handleClose}></span></div>
                    <div className="popup-inner">
                        <div className="id-customer">Mã nhân viên <span className='required'>*</span> <span className='id'>BQZV</span></div>
                        <Row>
                            <Col xs={12} md={6}>
                                <label htmlFor="">Họ và tên</label>
                                <p>Nguyễn Thanh Tuyên</p>
                            </Col>
                            <Col xs={12} md={6}>
                                <label htmlFor="">Số điện thoại</label>
                                <p>012345678</p>
                            </Col>
                            <Col xs={12} md={6}>
                                <label htmlFor="">Địa chỉ</label>
                                <p>203 Nguyễn Huy Tưởng, Thanh Xuân, Hà Nội</p>
                            </Col>
                            <Col xs={12} md={6}>
                                <label htmlFor="">CCCD/CMND</label>
                                <p>012345678</p>
                            </Col>
                            <Col xs={12} md={6}>
                                <label htmlFor="">Email</label>
                                <p>thanhtuyen@dpcargo.com</p>
                            </Col>
                            <Col xs={12} md={6}>
                                <label htmlFor="">Vai trò</label>
                                <p>Quản trị viên</p>
                            </Col>
                            <Col xs={12} md={6}>
                                <label htmlFor="">Đối tác</label>
                                <p>DP-CARGO</p>
                            </Col>
                            <Col xs={12} md={6}>
                                <label htmlFor="">Kho VN</label>
                                <p>DP-CARGO</p>
                            </Col>
                            <Col className='text-center'>
                                <Button variant="outline-primary mx-2 fw-medium" type="submit">
                                    <i className="uil uil-plus-square me-1"></i> Hủy bỏ
                                </Button>
                                <Button variant="primary mx-2 fw-medium" type="submit">
                                    <i className="uil uil-plus-square me-1"></i> Sửa nhân viên
                                </Button>
                            </Col>
                        </Row>
                    </div>
                </div>
                <div className={`popup-overlay ${props.isClass}`} onClick={props.handleClose}></div>
            </div>
        </>
    );
};

export default ViewUser;