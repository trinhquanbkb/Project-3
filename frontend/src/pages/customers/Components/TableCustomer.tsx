import React from "react";
import { Row, Col, Card, Button } from "react-bootstrap";

// components
import Table from "../../user/Components/Table";

//dummy data
import { dataCustomer as data } from "./DataCustomer";


const columns = [
    {
        Header: "#",
        accessor: "stt",
        sort: false,
    },
    {
        Header: "ID Khách hàng",
        accessor: "id",
        sort: true,
    },
    {
        Header: "Tên Khách hàng",
        accessor: "name",
        sort: true,
    },
    {
        Header: "Nickname",
        accessor: "nickname",
        sort: true,
    },
    {
        Header: "Số dư hiện tại",
        accessor: "current_balance",
        sort: true,
    },
    {
        Header: "Đã thanh toán",
        accessor: "paid",
        sort: true,
    },
    {
        Header: "Tổng tiền đã nạp",
        accessor: "total_money",
        sort: false,
    },
    {
        Header: "Thông tin khách hàng",
        accessor: "info_customer",
        sort: false,
    },
    {
        Header: "Giá cước vận chuyển",
        accessor: "shipping_rates",
        sort: false,
    },
    {
        Header: "Ngày tạo",
        accessor: "date_created",
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


const TableCustomer = (props: any) => {
    return (
        <>
            <Row>
                <Col>
                    <Card className="card-custom">
                        <Card.Body>
                            <Table
                                tableClass={'table-custom table-customer'}
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
            {
                data.forEach((item: any) => (
                    item["info_customer"] = (
                        <div className="item-info-customer">
                            <a href="#">
                                <i className="uil uil-location-point"></i>
                            </a>
                            <a href="#">
                                <i className="uil uil-phone-volume"></i>
                            </a>
                            <a href="#">
                                <i className="uil uil-envelope-open"></i>
                            </a>
                        </div>
                    ),
                    item["action"] = (
                        <div className="btn-wrap">
                            <Button onClick={props.handleUpdate} size="sm">
                                <i className="uil-edit-alt"></i>
                            </Button>
                            <Button variant="warning" onClick={props.handleEdit} size="sm">
                                <i className="uil uil-dollar-alt"></i>
                            </Button>
                        </div>
                    )
                ))
            }
        </>
    );
};

export default TableCustomer;
