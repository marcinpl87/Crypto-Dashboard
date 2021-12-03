import React, {
    useState,
} from 'react';
import ReactDOM from 'react-dom';
import Header from './components/header/Header';

const Wrapper = () => {
    const [
        isDarkMode,
        setDarkMode,
    ] = useState(true);
    return (
        <React.Fragment>
            <Header
                isDarkMode={
                    isDarkMode
                }
                setDarkMode={
                    setDarkMode
                }
            />
            <div
                className={`
                    app-main
                    ${
                        isDarkMode
                            ? 'dark-mode'
                            : ''
                    }
                `}
            >
            </div>
        </React.Fragment>
    );
}

export default Wrapper;
