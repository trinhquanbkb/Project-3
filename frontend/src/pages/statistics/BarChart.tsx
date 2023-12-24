import Chart from 'react-apexcharts';
import { Card } from 'react-bootstrap';
import { ApexOptions } from 'apexcharts';

// components
import Loader from '../../components/Loader';

// types
import { ApexLinearChartData } from './data';

interface BarChartProps {
    basicBarChartData: ApexLinearChartData;
    showLoader?: boolean;
    name: string;
    categories: any;
}

const BarChart = ({ basicBarChartData, showLoader, name, categories }: BarChartProps) => {
    const options: ApexOptions = {
        chart: {
            height: 500,
            type: 'bar',
        },
        plotOptions: {
            bar: {
                horizontal: true,
            },
        },
        xaxis: {
            categories: [
                ...categories
            ],
        },
    };

    const series = [
        {
            data: basicBarChartData || [],
        },
    ];

    return (
        <Card>
            <Card.Body>
                <h4 className="header-title mt-0 mb-3">{ name }</h4>
                {showLoader ? (
                    <div style={{ height: 380, position: 'relative' }}>
                        <Loader />
                    </div>
                ) : (
                    <Chart
                        options={options}
                        series={series}
                        type="bar"
                        height={500}
                        className="apex-charts"
                        dir="ltr"
                    />
                )}
            </Card.Body>
        </Card>
    );
};

export default BarChart;
