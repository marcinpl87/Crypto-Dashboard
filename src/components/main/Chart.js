import React, {
    useState,
    useEffect,
} from 'react';
import ReactDOM from 'react-dom';
import ApexChart from 'react-apexcharts';
import Utils from '../../Utils';

const Chart = (props) => {
    const [
        data,
        setData,
    ] = useState(false);
    useEffect(() => {
        Utils.ajax(
            'get',
            'quotes/' + props.symbol
        ).done((apiData) => {
            let dates = [];
            let quotes = [];
            apiData.map((q) => {
                dates.push(q[0]);
                quotes.push(q[1]);
            });
            const returnData = {
                options: {
                    theme: {
                        mode: props.isDarkMode
                            ? 'dark'
                            : 'light',
                    },
                    chart: {
                        background: 'none',
                        type: 'area',
                    },
                    dataLabels: {
                        enabled: false
                    },
                    stroke: {
                        curve: 'smooth'
                    },
                    fill: {
                        type: 'gradient',
                        gradient: {
                            shade: props.isDarkMode
                                ? 'light'
                                : 'dark',
                            type: 'vertical',
                            shadeIntensity: 0.1,
                            inverseColors: true,
                            opacityFrom: 0.5,
                            opacityTo: 0,
                            stops: [0, 80],
                            colorStops: []
                        }
                    },
                    xaxis: {
                        categories: []
                    },
                },
                series: [
                    {
                        name: 'series-1',
                        data: []
                    }
                ]
            };
            returnData.options.xaxis.categories = dates;
            returnData.series[0].data = quotes;
            setData(returnData);
        });
    }, []); //run only once after first render
    return (
        <React.Fragment>
                {data && <ApexChart
                    options={data.options}
                    series={data.series}
                    type="area"
                />}
        </React.Fragment>
    );
}

export default Chart;
