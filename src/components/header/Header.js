import React from 'react';
import ReactDOM from 'react-dom';
import ThemeSwitch from './ThemeSwitch';

const Header = (props) => {
    return (
        <div className={`
            app-header
            d-flex
            align-items-center
            justify-content-between
            ${
                props.isDarkMode
                    ? 'dark-mode'
                    : ''
            }
        `}>
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
            <ThemeSwitch
                isDarkMode={
                    props.isDarkMode
                }
                setDarkMode={
                    props.setDarkMode
                }
            />
        </div>
    );
}

export default Header;
