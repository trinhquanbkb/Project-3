import React, { useEffect, useState } from "react";
import { Row, Col, Button, Form, Breadcrumb, FormControl, Card } from "react-bootstrap";

//dummy data
import { records as data,recordsDaNhapKho } from "./dataDemo";

import { Records } from "./dataDemo";
import TableTrackingSearch from "./TableTrackingSearch";


const listBreadCrumb = [
    {
        path: "/",
        label: "Home",
        active: false,
        icon:"uil-home-alt"
    },
    {
        path: "/",
        label: "Tìm kiếm tracking",
        active: true,
        // icon:"uil-file-alt"
    },
];

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


const SearchTracking = () => {

    const [keywordTracking,setKeywordTracking] = useState('')
    const [numberTracking,setNumberTracking] = useState(() => {
        const storageKeyword = JSON.parse(localStorage.getItem('keyword') || '[]');
        return storageKeyword ?? []
    })
    
    const [dataDemo,setDataDemo] = useState(data)
 
  
    // keywordtracking
    const handleKeywordTracking = (event:any) => {

        let textInput = event.target.value
       
        setKeywordTracking(textInput)

        if(textInput.includes(',') || textInput.includes(' ')){
            
            let list_kw = textInput.split((/[,\s]+/));

            if(list_kw !== ''){
                list_kw.map((item: any) => (
                    (item !== '' ? (
                        setNumberTracking((prev:any) => {
                       
                            const newListKw =  [...prev,item]
                            setKeywordTracking('')
                    
                            const jsonKeywords = JSON.stringify(newListKw)
                            localStorage.setItem('keyword',jsonKeywords)
                            console.log('<span class="success">Add task success</span>')
                            return newListKw
                           
                        })
                    ): null)
                   
                ))
            }
            
        } 

        

    }

    const handleInputKeyDown = (event:any) => {
        if (event.key === 'Enter' && keywordTracking.trim() !== '') {
            let textInput = event.target.value
            setNumberTracking((prev:any) => {
                const newListKw =  [...prev,textInput]
                setKeywordTracking('')
                const jsonKeywords = JSON.stringify(newListKw)
                localStorage.setItem('keyword',jsonKeywords)
                return newListKw
            })
      
        }

        if (event.key === ' ' && keywordTracking.trim() !== '') {
           
            let textInput = event.target.value
            setNumberTracking((prev:any) => {
                const newListKw =  [...prev,textInput]
                setKeywordTracking('')
                const jsonKeywords = JSON.stringify(newListKw)
                localStorage.setItem('keyword',jsonKeywords)
                return newListKw
            })
      
        }

    };

    const handleRemoveKeyword = (index:number) => {
        setNumberTracking((prev:any) => {
          const newList = [...prev]
  
          newList.splice(index,1)
  
          const jsonKws = JSON.stringify(newList)
          localStorage.setItem('keyword',jsonKws)
  
          return newList
        })
    }

    const removeAllKeyword = () => {
        localStorage.removeItem('keyword');
        setNumberTracking('')
    }
    
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
            </div>
            </Col>
        </Row>

        <hr className="mt-0"/>

        <Row>
            <Col xs={12}>
         
                <Form.Group className="form-search-tracking-multi">
                    <div className="list-value-input">
                        {numberTracking != '' ? (numberTracking.map((keyword:any,index:any) => (
                            <div key={index}> 
                                <div className="keyword-added">  
                                    {keyword}
                                    <span className="remove-kw" key={index} onClick={() => {handleRemoveKeyword(index)}}><i className="uil uil-times"></i></span>
                                </div>
                            </div>
                        ))) : null} 
                    </div>
                    <div className="field-group">
                        {numberTracking != '' && Object.keys(numberTracking).length > 3 ? (
                            
                            <span className="remove-all" onClick={removeAllKeyword}><i className="uil uil-times"></i></span>
                        ) : null}
                        <Form.Control type="text" placeholder="Tìm kiếm theo Tracking" onKeyDown={(event) => {handleInputKeyDown(event)}} onChange={handleKeywordTracking} value={keywordTracking || ''}/>
                        <Button type="submit" className="btn-search">
                            <i className="uil uil-search"></i>
                        </Button>
                    </div>
                </Form.Group>
            
            </Col>
        </Row>     
      


        <Row>
            <Col>
            <Card>
                <Card.Body>
                <TableTrackingSearch
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

export default SearchTracking;
