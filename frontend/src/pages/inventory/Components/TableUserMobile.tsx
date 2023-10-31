import React from 'react';
import { Row, Col } from "react-bootstrap";
const TableUserMobile = (props: any) => {
    return (
        <>
            <Row>
                <Col>
                    <div className="table-user-mb">
                        <div className="item-table">
                            <div className="item">Mã nhân viên: <span className="fw-bold text-black">123456789</span></div>
                            <div className="item">Họ và tên: <span>Nguyễn Thanh Tuyền</span></div>
                            <div className="item">Số điện thoại: <span>12345678</span></div>
                            <div className="item">Email: <span>thanhtuyen@dpcargo.vvn</span></div>
                            <div className="item">Quyền: <span>Quản trị viên</span></div>
                            <div className="btn-wrap">
                                <button type="button" className="btn btn-primary btn-sm" onClick={props.handleView}>
                                    <i className="uil uil-eye"></i> Xem
                                </button>
                                <button type="button" className="btn btn-warning btn-sm" onClick={props.handleEdit}>
                                    <i className="uil uil-edit-alt"></i> Sửa
                                </button>
                                <button type="button" className="btn btn-outline-primary btn-sm" onClick={props.handleDelete}>
                                    <i className="uil uil-times"></i> Xóa
                                </button>
                            </div>
                        </div>
                        <div className="item-table">
                            <div className="item">Mã nhân viên: <span className="fw-bold text-black">123456789</span></div>
                            <div className="item">Họ và tên: <span>Nguyễn Thanh Tuyền</span></div>
                            <div className="item">Số điện thoại: <span>12345678</span></div>
                            <div className="item">Email: <span>thanhtuyen@dpcargo.vvn</span></div>
                            <div className="item">Quyền: <span>Quản trị viên</span></div>
                            <div className="btn-wrap">
                                <button type="button" className="btn btn-primary btn-sm" onClick={props.handleView}>
                                    <i className="uil uil-eye"></i> Xem
                                </button>
                                <button type="button" className="btn btn-warning btn-sm" onClick={props.handleEdit}>
                                    <i className="uil uil-edit-alt"></i> Sửa
                                </button>
                                <button type="button" className="btn btn-outline-primary btn-sm" onClick={props.handleDelete}>
                                    <i className="uil uil-times"></i> Xóa
                                </button>
                            </div>
                        </div>
                    </div>
                </Col>
            </Row>
        </>
    );
};

export default TableUserMobile;