import React from 'react';
import ReactDOM from 'react-dom';

const ThemeSwitch = (props) => {
    return (
        <div className="form-check form-switch">
            <input
                className="form-check-input"
                type="checkbox"
                role="switch"
                id="theme-switch"
                onChange={
                    (e) => {
                        props.setDarkMode(
                            e.currentTarget.checked
                        );
                        setIsChecked(
                            e.currentTarget.checked
                        );
                    }
                }
                checked={props.isDarkMode}
            />
            <label
                className="form-check-label"
                htmlFor="theme-switch"
            >
                &nbsp;☽&nbsp;
            </label>
        </div>
    );
}

export default ThemeSwitch;
