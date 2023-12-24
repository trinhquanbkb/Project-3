import React, { useEffect, useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import Loading from "../../components/Loading";


import BarChart from './BarChart';

import { useGetRemainListQuery } from '../../api/statisticApi';

const SoldList = () => {
    const [isChatInitilized, setIsChatInitilized] = useState<boolean>(false);

    const { data, isFetching } = useGetRemainListQuery({});

    const convertValue = (data: any) => {
        const productNames: any = [];
        const total_sold: any = [];
        data.forEach((product: any) => {
            productNames.push(product.product_name);
            total_sold.push(product.total_sold);
        });
        return {
            productNames,
            total_sold
        }
    }

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
        <React.Fragment>
            {isFetching ? (
                <Loading />
            ) : (
                <>
                    <Row className='mt-3'>
                        <Col xl={20}>
                            <BarChart
                                basicBarChartData={convertValue(data).total_sold}
                                showLoader={!isChatInitilized}
                                name={"Thống kê số lượng sản phẩm đã bán"}
                                categories={convertValue(data).productNames}
                            />
                        </Col>
                    </Row>
                </>
            )}

        </React.Fragment>
    );
};

export default SoldList;
