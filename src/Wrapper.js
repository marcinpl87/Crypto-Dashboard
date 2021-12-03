import React from 'react';
import ReactDOM from 'react-dom';
import Header from './components/header/Header';

const Wrapper = () => {
    return (
        <React.Fragment>
            <Header />
            <div className="app-main">
            </div>
        </React.Fragment>
    );
}

export default Wrapper;
