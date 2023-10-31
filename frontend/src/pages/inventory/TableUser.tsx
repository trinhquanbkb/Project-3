import React from "react";
import { Row, Col, Card, Button } from "react-bootstrap";

// components
import Table from "../../components/Table";

//dummy data
import { dataUser as data } from "./dataUser";

const columns = [
    {
        Header: "#",
        accessor: "stt",
        sort: false,
    },
    {
        Header: "Mã nhân viên",
        accessor: "code",
        sort: true,
    },
    {
        Header: "Họ và tên",
        accessor: "fullname",
        sort: true,
    },
    {
        Header: "Số điện thoại",
        accessor: "phone",
        sort: true,
    },
    {
        Header: "Email",
        accessor: "email",
        sort: true,
    },
    {
        Header: "Quyền",
        accessor: "role",
        sort: false,
    },
    {
        Header: "Hành động",
        accessor: "action",
        sort: false,
    },
];

const sizePerPageList = [
    {
        text: "5",
        value: 5,
    },
    {
        text: "10",
        value: 10,
    },
    {
        text: "25",
        value: 25,
    },
    {
        text: "All",
        value: data.length,
    },
];


const TableUser = () => {
    return (
        <>
            <Row>
                <Col>
                    <Card>
                        <Card.Body>
                            <Table
                                columns={columns}
                                data={data}
                                pageSize={5}
                                sizePerPageList={sizePerPageList}
                                isSortable={true}
                                pagination={true}
                                isExpandable={true}
                            />
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            {/* {
                data.forEach((item: any) => {
                   
                    item["action"] = (
                        <div className="btn-wrap">
                            <Button type="button" className="btn btn-outline-primary" onClick={handleViewUser}>
                                <i className="uil uil-eye"></i> Xem
                            </Button>
                            <Button type="button" className="btn btn-outline-primary" onClick={handleEditUser}>
                                <i className="uil uil-edit-alt"></i> Sửa
                            </Button>
                            <Button type="button" className="btn btn-outline-primary" onClick={handleViewUser}>
                                <i className="uil uil-times"></i> Xóa
                            </Button>
                        </div>
                    );
                });
            } */}
        </>
    );
};

export default TableUser;
