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
    ] = useState(props.symbol);
    return (
        <div className="card">
            <div className="card-body">
                <div className="
                    d-flex
                    justify-content-between
                    align-items-center
                    card-title
                ">
                    {symbol
                        ? <h5>{symbol.toUpperCase()}</h5>
                        : <h5>Click on ⚙️ icon to add new chart ➜</h5>
                    }
                    <button
                        type="button"
                        className="
                            btn
                            btn-sm
                            btn-outline-primary
                        "
                        data-bs-toggle="modal"
                        data-bs-target={
                            `#modal-${props.sid}`
                        }
                    >
                        ⚙️
                    </button>
                </div>
                {symbol
                    && <Chart
                        key={Math.random()}
                    isDarkMode={
                        props.isDarkMode
                    }
                        symbol={symbol}
                />
                }
            </div>
            <Modal
                title={symbol ? symbol.toUpperCase() : 'New chart'}
                modalId={`modal-${props.sid}`}
                callback={(newSymbol) => {
                    props.setSymbol(props.sid, newSymbol);
                }}
            />
        </div>
    );
}
