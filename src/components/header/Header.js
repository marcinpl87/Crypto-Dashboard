import React from 'react';
import ReactDOM from 'react-dom';

const Header = () => {
    return (
        <div className="
            app-header
            d-flex
            align-items-center
            justify-content-between
        ">
            <h1>
                <span className="
                    badge
                    bg-primary
                ">
                    Crypto
                </span>
                &nbsp;&&nbsp;
                <span className="
                    badge
                    bg-primary
                ">
                    Stock
                </span>
                &nbsp;Market Dashboard
            </h1>
        </div>
    );
}

export default Header;
