import React from 'react';
import ReactDOM from 'react-dom';
import Wrapper from './Wrapper';

document.addEventListener(
    'DOMContentLoaded',
    () => {
        ReactDOM.render(
            <Wrapper />,
            document.getElementsByClassName(
                'app-container'
            )[0]
        );
    }
);
