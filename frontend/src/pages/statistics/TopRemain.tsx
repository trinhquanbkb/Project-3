import React, { useEffect, useState } from 'react';
import { Row, Col, Button, Form } from "react-bootstrap";
import Loading from "../../components/Loading";

import BarChart from './BarChart';
import queryString from "query-string";
import { useGetTopRemainListQuery } from '../../api/statisticApi';
import { useLocation } from 'react-router-dom';

const TopRemainList = () => {
    const [isChatInitilized, setIsChatInitilized] = useState<boolean>(false);
    const [numberTop, setNumberTop] = useState(5);
    const [search, setSearch] = useState(5);
    const location = useLocation();


    const { data, isFetching } = useGetTopRemainListQuery(search);

    const convertValue = (data: any) => {
        const productNames: any = [];
        const inventories: any = [];
        data.forEach((product: any) => {
            productNames.push(product.product_name);
            inventories.push(product.inventory);
        });
        return {
            productNames,
            inventories
        }
    }

    const handleSearchOnEnter = (event: any) => {
        event.preventDefault();
        if (event.key === "Enter") {
            setSearch(numberTop);
        }
    };

    useEffect(() => {
    	const query = location.search;
    	const parsed = queryString.parse(query);

    	setSearch(numberTop);
    }, []);


    useEffect(() => {
        // set deafult config of apex chart
        if ((window as any).Apex) {
            (window as any).Apex = {
                chart: {
                    parentHeightOffset: 0,
                    toolbar: {
                        show: false,
                    },
                },
                grid: {
                    padding: {
                        left: 20,
                        right: 0,
                    },
                },
                colors: ['#5369F8', '#43D39E', '#F77E53', '#1CE1AC', '#25C2E3', '#FFBE0B'],
                tooltip: {
                    theme: 'dark',
                    x: { show: false },
                },
                dataLabels: {
                    enabled: false,
                },
                xaxis: {
                    axisBorder: {
                        color: '#D6DDEA',
                    },
                    axisTicks: {
                        color: '#D6DDEA',
                    },
                },
                yaxis: {
                    labels: {
                        offsetX: -5,
                    },
                },
            };
            setIsChatInitilized(true);
        }
        return () => {
            if ((window as any).Apex) {
                (window as any).Apex = {};
            }
        };
    }, []);

    return (
        <>
            <Row className='mt-3'>
                <Col xs={12}>
                    <div className="wrap-filter">
                        <div className="list-input">
                            <Row>
                                <Col xs={3}>
                                    <div className="col-left">
                                        <div className="input-search">
                                            <Form.Group className="form-search-user form-search-tracking">
                                                <Form.Control
                                                    type="search"
                                                    placeholder="Số sản phẩm muốn hiển thị"
                                                    onChange={(e) => {
                                                        if (e.target.value === ""){
                                                            setNumberTop(0);
                                                        }else{
                                                            setNumberTop(
                                                                parseInt(e.target.value)
                                                            );
                                                        }
                                                    }}
                                                    value={numberTop}
                                                    onKeyUp={
                                                        handleSearchOnEnter
                                                    }
                                                />
                                                <Button
                                                    type="submit"
                                                    className="btn-search"
                                                    onClick={() => {
                                                        setSearch(numberTop);
                                                    }}
                                                ></Button>
                                            </Form.Group>
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                        </div>
                    </div>
                </Col>
            </Row>
            <React.Fragment>
                {isFetching ? (
                    <Loading />
                ) : (
                    <>
                        <Row>
                            <Col xl={20}>
                                {/* {console.log(data)} */}
                                <BarChart
                                    basicBarChartData={convertValue(data).inventories}
                                    showLoader={!isChatInitilized}
                                    name={"Các sản phẩm tồn kho nhiều nhất"}
                                    categories={convertValue(data).productNames}
                                />
                            </Col>
                        </Row>
                    </>
                )}


            </React.Fragment>
        </>
    );
};

export default TopRemainList;
