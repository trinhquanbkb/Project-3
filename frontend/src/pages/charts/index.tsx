import React, { useEffect, useState } from 'react';
import { Row, Col } from 'react-bootstrap';

// components
import PageTitle from '../../components/PageTitle';

import BarChart from './BarChart';

// dummy data
import {
    basicBarChartData,
} from './data';

const ApexChart = () => {
    const [isChatInitilized, setIsChatInitilized] = useState<boolean>(false);

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
            <PageTitle
                breadCrumbItems={[
                    { label: 'Apps', path: '/components/charts' },
                    { label: 'Charts', path: '/components/charts', active: true },
                ]}
                title={'Charts'}
            />

            {/* <Row>
                <Col xl={6}>
                    <StackedAreaChart stackedAreaChartData={stackedAreaChartData} showLoader={!isChatInitilized} />
                </Col>
                <Col xl={6}>
                    <ColumnChart basicColumnChartData={basicColumnChartData} showLoader={!isChatInitilized} />
                </Col>
            </Row> */}

            {/* <Row>
                <Col xl={6}>
                    <ColumnDataLabelsChart columnChartData={columnChartData} showLoader={!isChatInitilized} />
                </Col>
                <Col xl={6}>
                    <MixedChart mixedChart1Data={mixedChart1Data} showLoader={!isChatInitilized} />
                </Col>
            </Row> */}

            <Row>
                <Col xl={20}>
                    <BarChart basicBarChartData={basicBarChartData} showLoader={!isChatInitilized} />
                </Col>
                {/* <Col xl={6}>
                    <MultipleYaxisChart multiYaxisChartData={multiYaxisChartData} showLoader={!isChatInitilized} />
                </Col> */}
            </Row>

            {/* <Row>
                <Col xl={6}>
                    <BubbleChart bubbleChartData={bubbleChartData} showLoader={!isChatInitilized} />
                </Col>
                <Col xl={6}>
                    <ThreeDBubbleChart threeDBubbleChartData={threeDBubbleChartData} showLoader={!isChatInitilized} />
                </Col>
            </Row> */}

            {/* <Row>
                <Col xl={6}>
                    <ScatterChart scatterChartData={scatterChartData} showLoader={!isChatInitilized} />
                </Col>
                <Col xl={6}>
                    <ScatterDateTimeChart
                        scatterDateTimeChartData={scatterDateTimeChartData}
                        showLoader={!isChatInitilized}
                    />
                </Col>
            </Row> */}
        </React.Fragment>
    );
};

export default ApexChart;
