import { useState, useEffect } from "react";
import { Row, Col, Button, Form, Breadcrumb } from "react-bootstrap";
import ViewUser from "./Components/ViewUser";
import AddUser from "./Components/AddUser";
import EditUser from "./Components/EditUser";
import TableUser from "./Components/TableUser";
import TableUserMobile from "./Components/TableUserMobile";
import DeleteUser from "./Components/DeleteUser";


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

const listSelectFilter = [
  {
    label: "Tất cả",
    value: 0,
  },
  {
    label: "Đang vận chuyển về vn",
    value: 1,
  },
  {
    label: "Đã vận chuyển về vn",
    value: 2,
  },
];


const UserList = () => {
  const [viewUser, setViewUser] = useState(false);
  const [addUser, setAddUser] = useState(false);
  const [editUser, setEditUser] = useState(false);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [modalShow, setModalShow] = useState(false);

  const handleResize = () => {
    setScreenWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleViewUser = () => {
    setViewUser(!viewUser);
  }

  const handleAddUser = () => {
    setAddUser(!addUser);
  }

  const handleEditUser = () => {
    setEditUser(!editUser);
  }

  const handleDeleteUser = () => {
    setModalShow(!modalShow);
  }

  const handleClosePopup = () => {
    if (viewUser) {
      setViewUser(!viewUser);
    }
    if (addUser) {
      setAddUser(!addUser);
    }
    if (editUser) {
      setEditUser(!editUser);
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
                  <Button variant="primary" className="mb-2 mb-sm-0" onClick={handleAddUser}>
                    <i className="uil uil-plus-square"></i> Thêm nhân viên
                  </Button>
                </div>
              </div>
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

      {
        screenWidth > 768
          ? <TableUser handleView={handleViewUser} handleEdit={handleEditUser} handleDelete={handleDeleteUser} />
          : <TableUserMobile handleView={handleViewUser} handleEdit={handleEditUser} handleDelete={handleDeleteUser} />
      }

      <DeleteUser
        show={modalShow}
        onHide={() => setModalShow(false)}
      />

      {
        (editUser && <EditUser isClass={'active'} handleClose={handleClosePopup} title="Sửa nhân viên" />)
      }

      {
        (viewUser && <ViewUser isClass={'active'} handleClose={handleClosePopup} title="Thông tin nhân viên" />)
      }

      {
        (addUser && <AddUser isClass={'active'} handleClose={handleClosePopup} title="Thêm nhân viên" />)
      }

    </>
  );
};

export default UserList;
