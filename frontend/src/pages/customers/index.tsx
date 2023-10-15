import { useState } from 'react';
import { Row, Col, Button, Form, Breadcrumb } from "react-bootstrap";
import StatisticsChartWidget from '../../components/StatisticsChartWidget';
import TableCustomer from "./Components/TableCustomer";
import UpdateCustomer from "./Components/UpdateCustomer";
import AddCustomer from "./Components/AddCustomer";

const listBreadCrumb = [
  {
    path: "/",
    label: "Home",
    active: false,
  },
  {
    path: "/",
    label: "Danh sách khách hàng",
    active: true,
  }
];

const listRadioFilter = [
  {
    label: "Chưa có sale phụ trách",
    value: 0,
  },
  {
    label: "Khách có công nợ",
    value: 1,
  },
];

const CustomerList = () => {
  const [addCustomer, setAddCustomer] = useState(false);
  const [updateCustomer, setUpdateCustomer] = useState(false);

  const handleUpdateCustomer = () => {
    setUpdateCustomer(!updateCustomer);
  }

  const handleAddCustomer = () => {
    setAddCustomer(!addCustomer);
  }

  const handleClosePopup = () => {
    if (updateCustomer) {
      setUpdateCustomer(!updateCustomer);
    }
    if (addCustomer) {
      setAddCustomer(!addCustomer);
    }
  }


  return (
    <>
      <Row>
        <Col xs={12}>
          <div className="page-title-box">
            <div className="page-title-box-group">
              <Breadcrumb listProps={{ className: "m-0" }}>
                {(listBreadCrumb || []).map((item, index) => {
                  return item.active ? (
                    <Breadcrumb.Item active key={index}>
                      <i className="uil uil-file-alt"></i> {item.label}
                    </Breadcrumb.Item>
                  ) : (
                    <Breadcrumb.Item key={index} href={item.path}>
                      {item.label === 'Home' ? (<i className="uil uil-home-alt"></i>) : ''}
                    </Breadcrumb.Item>
                  );
                })}
              </Breadcrumb>
              <div className="page-title-right">
                <div className="mt-2 mt-md-0">
                  <Button variant="primary" className="mb-2 mb-sm-0" onClick={handleAddCustomer}>
                    <i className="uil uil-plus-square"></i> Thêm khách hàng
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Col>
      </Row>

      <Row>
        <Col sm={6} xl={3} className="mb-3">
          <StatisticsChartWidget
            title="Tổng số dư hiện tại"
            stats="-613M"
            trend={{
              textClass: 'text-success',
              icon: 'uil uil-arrow-up',
              value: '10.21%',
            }}
            colors={['#727cf5']}
          />
        </Col>

        <Col sm={6} xl={3} className="mb-3">
          <StatisticsChartWidget
            title="Tổng thanh toán"
            stats="8,5B"
            trend={{
              textClass: 'text-danger',
              icon: 'uil uil-arrow-down',
              value: '5.05%',
            }}
            colors={['#f77e53']}
          />
        </Col>
        <Col sm={6} xl={3} className="mb-3">
          <StatisticsChartWidget
            title="Tổng tiền đã nạp"
            stats="8,5B"
            trend={{
              textClass: 'text-success',
              icon: 'uil uil-arrow-up',
              value: '21.16%',
            }}
            colors={['#43d39e']}
          />
        </Col>

        <Col sm={6} xl={3} className="mb-3">
          <StatisticsChartWidget
            title="Tổng sô lượng khách hàng"
            stats="341 người"
            trend={{
              textClass: 'text-danger',
              icon: 'uil uil-arrow-down',
              value: '5.05%',
            }}
            colors={['#ffbe0b']}
          />
        </Col>
      </Row>

      <Row className="mt-1 mb-4">
        <Col xs={12}>
          <div className="box-tag">
            <div className="item-tag">
              <span>Freeship</span>
            </div>
            <div className="item-tag">
              <span>Được công nợ</span>
            </div>
            <div className="item-tag">
              <span>Thu tiền trước</span>
            </div>
          </div>
        </Col>
      </Row>

      <Row>
        <Col xs={12}>
          <div className="page-title-box pt-0">
            <Form className="form-customer">

              <Form.Group className="form-search-user">
                <Form.Group className="form-border">
                  <Form.Control type="search" name="customer" placeholder="Tìm kiếm theo khách hàng" />
                </Form.Group>
                <Button type="submit" className="btn-search"></Button>
              </Form.Group>

              <Form.Group className="form-search-user">
                <Form.Group className="form-border">
                  <Form.Control type="search" name="nickname" placeholder="Tìm kiếm theo nickname" />
                </Form.Group>
                <Button type="submit" className="btn-search"></Button>
              </Form.Group>

              <Form.Group className="form-search-user">
                <Form.Group className="form-border">
                  <Form.Control type="search" name="sale" placeholder="Tìm kiếm theo sale" />
                </Form.Group>
                <Button type="submit" className="btn-search"></Button>
              </Form.Group>

              <Form.Group className="form-search-btn">
                {
                  listRadioFilter.map((item, index) => (
                    <Form.Check key={index}
                      inline
                      label={item.label}
                      type="radio"
                      name="sale"
                      className='form-check-inline-label'
                      id={`sale-${index}`}
                    />
                  ))
                }
              </Form.Group>
              <Form.Group className="form-search-btn">
                <Button variant="primary">
                  <i className="uil uil-search"></i>
                </Button>
                <Button variant="primary">
                  <i className="uil uil-redo"></i>
                </Button>
              </Form.Group>
            </Form>

            <Button variant="outline-primary">
              <i className="uil uil-export me-1"></i>Xuất Excel
            </Button>
          </div>
        </Col>
      </Row>

      <TableCustomer handleUpdate={handleUpdateCustomer} />

      {
        (updateCustomer && <UpdateCustomer isClass={'active'} handleClose={handleClosePopup} />)
      }

      {
        (addCustomer && <AddCustomer isClass={'active'} handleClose={handleClosePopup} />)
      }

    </>
  );
};

export default CustomerList;