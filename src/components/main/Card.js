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
                    {symbol.name
                        ? <h5>{symbol.name.toUpperCase()}</h5>
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
                {symbol.name
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
                title={symbol.name ? symbol.name.toUpperCase() : 'New chart'}
                modalId={`modal-${props.sid}`}
                save={(type, newSymbol) => {
                    props.setSymbol(props.sid, type, newSymbol);
                }}
                del={() => {
                    props.delSymbol(props.sid)
                }}
            />
        </div>
    );
}
