import React from 'react';
import ReactDOM from 'react-dom';
import ApexChart from "react-apexcharts";
import Modal from './Modal';
import 'bootstrap';

const Chart = (props) => {
    const randId = Math
        .random()
        .toString(10)
        .replace(
            '.',
            ''
        );
    const data = {
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
                categories: [
                    1991,
                    1992,
                    1993,
                    1994,
                    1995,
                    1996,
                    1997,
                    1998,
                    1999,
                ]
            },
        },
        series: [
            {
                name: 'series-1',
                data: [
                    30,
                    60,
                    45,
                    50,
                    49,
                    60,
                    70,
                    91,
                ]
            }
        ]
    };
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
                <ApexChart
                    options={data.options}
                    series={data.series}
                    type="area"
                />
            </div>
            <Modal
                modalId={`modal-${randId}`}
            />
        </div>
    );
}

export default Chart;
