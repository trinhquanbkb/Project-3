import React, { useEffect, useState } from 'react';
import { Row, Col } from 'react-bootstrap';


import BarChart from './BarChart';

// dummy data
import {
    basicBarChartData,
} from './data';
import { useGetRemainListQuery } from '../../api/statisticApi';

const RemainList = () => {
    const [isChatInitilized, setIsChatInitilized] = useState<boolean>(false);

    const { data, error, isLoading } = useGetRemainListQuery({});


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
            {console.log(data)}
            {/* <PageTitle
                breadCrumbItems={[
                    { label: 'Apps', path: '/components/charts' },
                    { label: 'Charts', path: '/components/charts', active: true },
                ]}
                title={'Charts'}
            /> */}

            <Row>
                <Col xl={20}>
                    <BarChart 
                        basicBarChartData={basicBarChartData} 
                        showLoader={!isChatInitilized} 
                        name={"Thống kê số lượng sản phẩm tồn kho"}
                        categories={categories}    
                    />
                </Col>
            </Row>
        </React.Fragment>
    );
};

export default RemainList;
