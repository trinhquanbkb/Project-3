import { useState, useEffect } from "react";
import { Row, Col, Button, Form, Breadcrumb } from "react-bootstrap";
import { useGetProductListQuery } from "../../api/productApi";
import ViewEmployee from "./Components/ViewEmplyee";


const listBreadCrumb = [
  {
    path: "/",
    label: "Home",
    active: false,
    icon: "uil-home-alt"
  },
  {
    path: "/",
    label: "Quản lý nhân viên",
    active: true,
  }
];


const UserList = () => {
  const [viewModal, setViewModal] = useState(false);
  const [search, setSearch] = useState<any>({
    page: 1,
    pageSize: 10,
  });
  const [id, setId] = useState('')
  const { data: listProduct, isFetching } = useGetProductListQuery({ ...search });

  if (isFetching) {
    return <>empty</>
  }
  const handleClosePopup = () => {
    if (viewModal) {
      setViewModal(!viewModal);
    }
  };
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
                  <Form.Control type="search" placeholder="Tìm kiếm theo mã nhân viên" />
                </Form.Group>
                <Button type="submit" className="btn-search"></Button>
              </Form.Group>
              <Form.Group className="form-search-user">
                <Form.Group className="form-border">
                  <Form.Control type="search" placeholder="Tìm kiếm theo tên" />
                </Form.Group>
                <Button type="submit" className="btn-search"></Button>
              </Form.Group>
              <Form.Group className="form-search-user">
                <Form.Group className="form-border">
                  <Form.Control type="search" placeholder="Tìm kiếm theo SĐT" />
                </Form.Group>
                <Button type="submit" className="btn-search"></Button>
              </Form.Group>
              <Form.Group className="form-search-btn">
                <Button variant="primary">
                  <i className="uil uil-redo"></i>
                </Button>
              </Form.Group>
            </Form>
          </div>
        </Col>
      </Row>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '10px',
        padding: '20px',
      }}>        {
          listProduct?.data.map(dt => dt.quantity > 0 && <div style={{
            padding: '20px',
            border: '1px solid #ddd',
            textAlign: 'center',
          }}>
            <img src={dt.url} style={{ width: '100%', objectFit: 'cover', aspectRatio: '1/1' }} />
            <div style={{ fontSize: 16, fontWeight: 700 }}>Tên: {dt.product_name}</div>
            <div style={{ fontSize: 16, fontWeight: 600 }}>Số lượng:{dt.quantity}</div>
            <button onClick={() => {
              setId(dt._id)
              setViewModal(true)
            }
            }>Xem chi tiết</button>
          </div>)
        }
      </div>
      {viewModal && (
        <ViewEmployee
          isClass={"active"}
          id={id.toString()}
          handleClose={handleClosePopup}
        />
      )}

    </>
  );
};

export default UserList;
