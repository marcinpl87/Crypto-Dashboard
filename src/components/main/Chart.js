import React, {
    useState,
    useEffect,
} from 'react';
import ReactDOM from 'react-dom';
import ApexChart from 'react-apexcharts';
import Modal from './Modal';
import Utils from '../../Utils';
import 'bootstrap';

const Chart = (props) => {
    const [
        data,
        setData,
    ] = useState(false);
    const randId = Math
        .random()
        .toString(10)
        .replace(
            '.',
            ''
        );
    useEffect(() => {
        Utils.ajax(
            'get',
            'quotes/gme'
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
        <div className="card">
            <div className="card-body">
                <div className="
                    d-flex
                    justify-content-between
                    align-items-center
                    card-title
                ">
                    <h5>Card</h5>
                    <button
                        type="button"
                        className="
                            btn
                            btn-sm
                            btn-outline-primary
                        "
                        data-bs-toggle="modal"
                        data-bs-target={
                            `#modal-${randId}`
                        }
                    >
                        ⚙️
                    </button>
                </div>
                {data && <ApexChart
                    options={data.options}
                    series={data.series}
                    type="area"
                />}
            </div>
            <Modal
                modalId={`modal-${randId}`}
            />
        </div>
    );
}

export default Chart;
