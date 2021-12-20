import React, {
    useState,
} from 'react';
import ReactDOM from 'react-dom';
import Suggest from './Suggest';

const Modal = (props) => {
    const [
        isFetch,
        setIsFetch,
    ] = useState(false);
    return (
        <div className="modal fade" id={props.modalId} tabIndex="-1">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">
                            {props.modalId}
                        </h5>
                        <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                        ></button>
                    </div>
                    <div className="modal-body">
                        <label htmlFor="symbol" className="form-label">
                            Stock ticker or company name
                        </label>
                        <Suggest
                            id="symbol"
                            className="form-control"
                            data={[
                                {
                                    name: 'C',
                                    year: 1972
                                }, {
                                    name: 'C#',
                                    year: 2000
                                },
                            ]}
                            placeholder="e.g. GME"
                            onFetchStart={() => {
                                setIsFetch(true);
                            }}
                            onFetchStop={() => {
                                setIsFetch(false);
                            }}
                        />
                        <div className="form-text">
                            {isFetch
                                ? <span>Loading tickers...</span>
                                : <span>&nbsp;</span>
                            }
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button
                            className="btn btn-primary"
                            data-bs-dismiss="modal"
                        >
                            Save
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Modal;
