import React from 'react';
import ReactDOM from 'react-dom';
import Card from './Card';

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
                        <Card
                            isDarkMode={
                                props.isDarkMode
                            }
                        />
                    </div>
                    <div className="col-md-6">
                        <Card
                            isDarkMode={
                                props.isDarkMode
                            }
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <Card
                            isDarkMode={
                                props.isDarkMode
                            }
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <Card
                            isDarkMode={
                                props.isDarkMode
                            }
                        />
                    </div>
                    <div className="col-md-6">
                        <Card
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
