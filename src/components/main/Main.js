import React, {
    useState,
} from 'react';
import ReactDOM from 'react-dom';
import Card from './Card';

const chunks = (arr, size = 2) => {
    return arr
        .map((x, i) => i % size == 0 && arr.slice(
            i,
            i + size
        ))
        .filter(x => x);
}

const Row = (props) => {
    return (
        <div className="row">
            {props.symbol.map((sym, k) => (
                <Col
                    key={k}
                    isDarkMode={
                        props.isDarkMode
                    }
                    symbol={sym}
                />
            ))}
        </div>
    );
};

const Col = (props) => {
    return (
        <div className="col-md-6">
            <Card
                isDarkMode={
                    props.isDarkMode
                }
                sid={
                    props.symbol.id
                }
                symbol={
                    props.symbol.name
                }
            />
        </div>
    );
};

export default (props) => {
    const [
        symbols,
        setSymbols,
    ] = useState([]);
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
                {chunks([
                    {'id': 1, 'name': 'bby'},
                    {'id': 2, 'name': 'chwy'},
                    {'id': 3, 'name': 'amzn'},
                    {'id': 4, 'name': 'gme'},
                ]).map((sym, k) => (
                    <Row
                        key={k}
                        isDarkMode={
                            props.isDarkMode
                        }
                        symbol={sym}
                    />
                ))}
            </div>
        </div>
    );
};
