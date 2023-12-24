import React, { useEffect, useState } from 'react';
import { Row, Col, Button, Form, Breadcrumb } from "react-bootstrap";

import BarChart from './BarChart';

// dummy data
import {
    basicBarChartData,
} from './data';

const TopRemainList = () => {
    const [isChatInitilized, setIsChatInitilized] = useState<boolean>(false);
    const [numberTop, setNumberTop] = useState(5);
    const [search, setSearch] = useState(5);

    const handleSearchOnEnter = (event: any) => {
		event.preventDefault();
		if (event.key === "Enter") {
			setSearch(numberTop);
		}
	};


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

    const categories: any = [
        'South Korea',
        'Canada',
        'United Kingdom',
        'Netherlands',
        'Italy',
        'France',
        'Japan',
        'United States',
        'China',
        'Germany',
    ];

    return (
        <React.Fragment>

            <Row>
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
                                                        setNumberTop(
                                                            parseInt(e.target.value)
                                                        );
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

            <Row>
                <Col xl={20}>
                    <BarChart
                        basicBarChartData={basicBarChartData}
                        showLoader={!isChatInitilized}
                        name={"Top các sản phẩm tồn kho"}
                        categories={categories}
                    />
                </Col>
            </Row>
        </React.Fragment>
    );
};

export default TopRemainList;
