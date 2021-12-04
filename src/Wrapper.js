import React, {
    useState,
} from 'react';
import ReactDOM from 'react-dom';
import Header from './components/header/Header';
import Main from './components/main/Main';

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
            <Main
                isDarkMode={
                    isDarkMode
                }
            />
        </React.Fragment>
    );
}

export default Wrapper;
