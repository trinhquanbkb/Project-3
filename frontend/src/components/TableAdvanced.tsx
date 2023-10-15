import React from "react";
import { Row, Col, Card, Button } from "react-bootstrap";
import FeatherIcon from "feather-icons-react";

// components
import Table from "./Table";

//dummy data
import { records as data, expandableRecords } from "../utils/data";

const columns = [
  {
    Header: "ID",
    accessor: "id",
    sort: true,
  },
  {
    Header: "Trạng thái",
    accessor: "status",
    sort: false,
  },
  {
    Header: "Mã AWB",
    accessor: "code",
    sort: false,
  },
  {
    Header: "SL thùng",
    accessor: "numberBin",
    sort: true,
  },
  {
    Header: "SL tracking",
    accessor: "numberTracking",
    sort: true,
  },
  {
    Header: "TLTT / TLKT (kg)",
    accessor: "weight",
    sort: false,
  },
  {
    Header: "Tổng tiền (VNĐ)",
    accessor: "price",
    sort: false,
  },
  {
    Header: "Quản lý",
    accessor: "manager",
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

expandableRecords.forEach((item: any) => {
  item["manager"] = (
    <Button className="manager-awb">
      <FeatherIcon className="me-1" icon="file-text" width="16" height="16" />
      Khai thác
    </Button>
  );
});

const Advanced = () => {
  return (
    <>
      <Row>
        <Col>
          <Card>
            <Card.Body>
              <Table
                columns={columns}
                data={expandableRecords}
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
    </>
  );
};

export default Advanced;
