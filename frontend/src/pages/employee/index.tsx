import React, { useEffect, useState } from "react";
import { Row, Col, Button, Form, Breadcrumb, FormControl, Card } from "react-bootstrap";


import A2ZTechDatepicker from "../../components/Datepicker";


//dummy data
import { records as data,recordsDaNhapKho } from "./dataDemo";
import TableTracking from "./TableTracking";
import { Records } from "./dataDemo";


const listBreadCrumb = [
  {
    path: "/",
    label: "Home",
    active: false,
    icon:"uil-home-alt"
  },
  {
    path: "/",
    label: "Quản lý tracking",
    active: true,
    // icon:"uil-file-alt"
  },
];

const btnFilter = [
  {
    slug:'tat-ca',
    name:'Tất cả',
    colorClass:'color-1'
  },
  {
    slug:'da-nhap-kho',
    name:'Đã nhập kho',
    colorClass:'color-2'
  },
  {
    slug:'dang-van-chuyen',
    name:'Đang vận chuyển',
    colorClass:'color-3'
  },
  {
    slug:'da-den-viet-nam',
    name:'Đã đến Việt Nam',
    colorClass:'color-4'
  },
  {
    slug:'da-khai-thac',
    name:'Đã khai thác',
    colorClass:'color-5'
  },
  {
    slug:'hoan-thanh',
    name:'Hoàn thành',
    colorClass:'color-6'
  },
  {
    slug:'da-huy-bo',
    name:'Đã huỷ bỏ',
    colorClass:'color-7'
  },{
    slug:'chua-co-loai',
    name:'Chưa có loại',
    colorClass:'color-8'
  },
  {
    slug:'chua-co-kh',
    name:'Chưa có KH',
    colorClass:'color-9'
  },

]

const columns = [
  {
    Header: "Mã đơn hàng",
    accessor: "id",
    sort: true,
  },
  {
    Header: "Mã tracking",
    accessor: "idTracking",
    sort: true,
  },
  {
    Header: "Trạng thái",
    accessor: "status",
    sort: false,
  },
  {
    Header: "Khách hàng",
    accessor: "customer",
    sort: true,
  },
  {
    Header: "Kho TQ",
    accessor: "wareHouseTQ",
    sort: false,
  },
  {
    Header: "Kho VN",
    accessor: "wareHouseVN",
    sort: false,
  },
  {
    Header: "Thông tin",
    accessor: "information",
    sort: true,
  },
  {
    Header: "Ghi chú",
    accessor: "note",
    sort: false,
  },
  {
    Header: "Đối tác",
    accessor: "partner",
    sort: false,
  },
  {
    Header: "Thời gian",
    accessor: "time",
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

const TrackingList = () => {

  const [btnData,setBtnData] = useState('tat-ca')
  const [dataFilter,setDataFilter] = useState([])

  const [keywordTracking,setKeywordTracking] = useState()
  const [keywordCustomer,setKeywordCustomer] = useState()

  const [dataDemo,setDataDemo] = useState(data)

  const handleBtnTabData = (slug:string) => {
      setBtnData(slug)
      {slug === 'tat-ca' ? setDataDemo(data) : setDataDemo(recordsDaNhapKho)}
      
  }

  const [dateRange, setDateRange] = useState<any>([new Date(), new Date().setDate(new Date().getDate() + 7)]);
  const [startDate, endDate] = dateRange;

  const handleKeywordTracking = (event:any) => {
    setKeywordTracking(event.target.value)
  }
  const handleKeywordCustomer = (event:any) => {
    setKeywordCustomer(event.target.value)
  }

  /*
   * handle date change
   */
  const onDateChange = (date: Date) => {
      if (date) {
          setDateRange(date);
      }
  };

  useEffect(() => {
    // fetch(`https://jsonplaceholder.typicode.com/${btnData}`)
    // .then(res => res.json())
    // .then(posts => {
    //   setDataFilter(posts)
    //     // in vao state se bi vong lap vo han
    // }) 


  },[btnData])

  return (
    <>
      <Row>
        <Col xs={12}>
          <div className="page-title-box">
            <Breadcrumb listProps={{ className: "m-0" }}>

              {/* {console.log(listBreadCrumb) } */}

              {(listBreadCrumb || []).map((item, index) => {
                return item.active ? (
                  <Breadcrumb.Item active key={index}>
                    {item.icon !== '' ? (<i className={`uil ${item.icon}`}></i>) : '' }   {item.label}
                  </Breadcrumb.Item>
                ) : (
                  <Breadcrumb.Item key={index} href={item.path}>
                    {item.icon !== '' ? (<i className={`uil ${item.icon}`}></i>) : '' }   {item.label}
                  </Breadcrumb.Item>
                );
              })}
            </Breadcrumb>
            <div className="page-title-right">
              <div className="mt-2 mt-md-0">
                <Button variant="primary" className="mb-2 mb-sm-0">
                  <i className="uil-plus me-1"></i> Tạo đơn hàng
                </Button>
              </div>
            </div>
          </div>
        </Col>
      </Row>

      <hr className="mt-0"/>

      <Row>
        <Col xs={12}>
          
          <div className="wrap-filter">
            
              <div className="list-button">
                {btnFilter.map((btn, index) => (
                  <button key={index} className={`mb-2 mb-sm-0 btn btn-rounded btn-outline-danger ${btnData === btn.slug ? "active" : ""} ${btn.colorClass}`} onClick={() => handleBtnTabData(btn.slug)}>  {btn.name}</button>
                ))}
              </div>
              
              <div className="list-input">
                <Row>
                  <Col xs={3}>
                    <div className="col-left">
                        <div className="input-search">
                          
                            <Form.Group className="form-search-user form-search-tracking">
                              <Form.Control type="search" placeholder="Tìm kiếm theo Tracking" onChange={handleKeywordTracking} value={keywordTracking || ''}/>
                              <Button type="submit" className="btn-search">
                                <i className="uil uil-search"></i>
                              </Button>
                            </Form.Group>
                         
                        </div>
                    </div>
                  </Col>
                  <Col xs={3}>
                    <div className="col-left">
                        <div className="input-search">
                          
                            <Form.Group className="form-search-user form-search-tracking">
                              <Form.Control type="search" placeholder="Tìm kiếm theo khách hàng" onChange={handleKeywordCustomer} value={keywordCustomer || ''}/>
                              <Button type="submit" className="btn-search">
                                <i className="uil uil-search"></i>
                              </Button>
                            </Form.Group>
                         
                        </div>
                    </div>
                  </Col>

                  <Col xs={6}>
                    <div className="col-right">
                      <div className="wrap-date-range">

                      <A2ZTechDatepicker
                          selectsRange
                          startDate={startDate}
                          endDate={endDate}
                          hideAddon={true}
                          dateFormat={'yyyy/MM/dd'}
                          onChange={(date) => {
                              onDateChange(date);
                          }}
                      /> 
                        {/* <Form.Control type="text" className="form-control date-start" placeholder="Ngày bắt đầu" />
                        <span><i className="bi bi-arrow-right"></i></span>
                        <Form.Control type="text" className="form-control date-end" placeholder="Ngày kết thúc" /> */}

                       

                      </div>
                        
                      <Form.Select className="list-time-select" aria-label="Default select example">
                        <option value="1">Thời gian nhập</option>
                        <option value="2">Thời gian đóng</option>
                        <option value="3">Thời gian xuất hàng</option>
                        <option value="4">Thời gian đến</option>
                      </Form.Select>

                    </div>
                    
                  </Col>
                </Row>
                 
              </div>
            
          </div>
        </Col>
      </Row>     

      

      <Row>
        <Col>
          <Card>
            <Card.Body>
              
              <TableTracking 
                columns={columns}
                data={dataDemo}
                pageSize={5}
                sizePerPageList={sizePerPageList}
                isSortable={true}
                pagination={true}
                
              />
              
            </Card.Body>
          </Card>
        </Col>
      </Row>

     

      {/* <Row>
        <Advanced />
      </Row> */}
    </>
  );
};

export default TrackingList;
