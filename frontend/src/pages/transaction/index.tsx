import React from "react";
import { Row, Col, Button, Form, Breadcrumb } from "react-bootstrap";

import Advanced from "../../components/TableAdvanced";
import FeatherIcon from "feather-icons-react";

const listBreadCrumb = [
  {
    path: "/",
    label: "Vận hành",
    active: false,
  },
  {
    path: "/",
    label: "Quản lý mã AWB",
    active: true,
  },
];

const listRadioFilter = [
  {
    label: "Tất cả",
    group: "radio-1",
  },
  {
    label: "Đang vận chuyển về vn",
    group: "radio-1",
  },
  {
    label: "Đã vận chuyển về vn",
    group: "radio-1",
  },
  {
    label: "Đang khai thác",
    group: "radio-1",
  },
  {
    label: "Đã khai thác",
    group: "radio-1",
  },
];

const TransactionList = () => {
  return (
    <>
      <Row>
        <Col xs={12}>
          <div className="page-title-box">
            <Breadcrumb listProps={{ className: "m-0" }}>
              {(listBreadCrumb || []).map((item, index) => {
                return item.active ? (
                  <Breadcrumb.Item active key={index}>
                    {item.label}
                  </Breadcrumb.Item>
                ) : (
                  <Breadcrumb.Item key={index} href={item.path}>
                    {item.label}
                  </Breadcrumb.Item>
                );
              })}
            </Breadcrumb>
            <div className="page-title-right">
              <div className="mt-2 mt-md-0">
                <Button variant="primary" className="mb-2 mb-sm-0">
                  <i className="uil-plus me-1"></i> Nhập AWB từ excel
                </Button>
              </div>
            </div>
          </div>
        </Col>
      </Row>

      <Row>
        <Col xs={12}>
          <p className="fw-bold mb-1">Trạng thái</p>
          <div className="page-title-box pt-0">
            <Form>
              <div key={`inline-radio}`}>
                {listRadioFilter.map((item, index) => {
                  return (
                    <Form.Check
                      key={index}
                      inline
                      label={item.label}
                      name={item.group}
                      type="radio"
                      className="me-4"
                      id={`inline-radio-${index}`}
                    />
                  );
                })}
              </div>
            </Form>
          </div>
        </Col>
      </Row>

      <Row>
        <Col xs={8} className="mb-3">
          <p className="fw-bold mb-1">Mã AWB</p>
          <div className="task-search d-inline-block mb-3 mb-sm-0 me-sm-1">
            <form>
              <div className="input-group">
                <input
                  type="text"
                  className="form-control search-input"
                  placeholder="Tìm kiếm..."
                />
                <span className="input-group-text search-page-list">
                  <FeatherIcon
                    icon="search"
                    color="white"
                    width="16"
                    height="16"
                  />
                </span>
              </div>
            </form>
          </div>
        </Col>
        <Col xs={2} className="mb-3">
          <div className="d-flex flex-column">
            <p className="fw-bold mb-1 text-center">Tổng TLKT/TLTT</p>
            <p className="fw-bold text-primary text-center">0.00 / 0.00 (kg)</p>
          </div>
        </Col>
        <Col xs={2} className="mb-3">
          <div className="d-flex flex-column">
            <p className="fw-bold mb-1 text-center">Tổng tiền</p>
            <p className="fw-bold text-primary text-center">1.000.000 (vnđ)</p>
          </div>
        </Col>
      </Row>

      <Row>
        <Advanced />
      </Row>
    </>
  );
};

export default TransactionList;
