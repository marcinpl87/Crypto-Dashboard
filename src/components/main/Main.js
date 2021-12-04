import React from 'react';
import ReactDOM from 'react-dom';
import Chart from './Chart';

const Main = (props) => {
    return (
        <div
            className={`
                app-main
                ${
                    props.isDarkMode
                        ? 'dark-mode'
                        : ''
                }
            `}
        >
            <div className="container">
                <div className="row">
                    <div className="col-md-6">
                        <Chart
                            isDarkMode={
                                props.isDarkMode
                            }
                        />
                    </div>
                    <div className="col-md-6">
                        <Chart
                            isDarkMode={
                                props.isDarkMode
                            }
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <Chart
                            isDarkMode={
                                props.isDarkMode
                            }
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <Chart
                            isDarkMode={
                                props.isDarkMode
                            }
                        />
                    </div>
                    <div className="col-md-6">
                        <Chart
                            isDarkMode={
                                props.isDarkMode
                            }
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Main;
