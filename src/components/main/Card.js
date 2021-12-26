import React, {
    useState,
} from 'react';
import ReactDOM from 'react-dom';
import Modal from './Modal';
import Chart from './Chart';
import 'bootstrap';

export default (props) => {
    const [
        symbol,
        setSymbol,
    ] = useState("gme");
    const randId = Math
        .random()
        .toString(10)
        .replace(
            '.',
            ''
        );
    return (
        <div className="card">
            <div className="card-body">
                <div className="
                    d-flex
                    justify-content-between
                    align-items-center
                    card-title
                ">
                    <h5>{symbol.toUpperCase()}</h5>
                    <button
                        type="button"
                        className="
                            btn
                            btn-sm
                            btn-outline-primary
                        "
                        data-bs-toggle="modal"
                        data-bs-target={
                            `#modal-${randId}`
                        }
                    >
                        ⚙️
                    </button>
                </div>
                <Chart
                    key={symbol}
                    isDarkMode={
                        props.isDarkMode
                    }
                    symbol={symbol}
                />
            </div>
            <Modal
                modalId={`modal-${randId}`}
                callback={(newSymbol) => {
                    console.log('modal save', newSymbol);
                    setSymbol(newSymbol);
                }}
            />
        </div>
    );
}
