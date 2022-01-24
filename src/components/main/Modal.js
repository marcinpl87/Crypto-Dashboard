import React, {
    useState,
} from 'react';
import ReactDOM from 'react-dom';
import Suggest from './SuggestApi';

const Modal = (props) => {
    const [
        isFetch,
        setIsFetch,
    ] = useState(false);
    let selectedSymbol = '';
    return (
        <div className="modal fade" id={props.modalId} tabIndex="-1">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">
                            {props.title}
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
                            placeholder="e.g. gme or gamestop"
                            endpoint="search"
                            getSuggestionValue={(suggestion) => {
                                selectedSymbol = suggestion['1. symbol'];
                                return suggestion['1. symbol'];
                            }}
                            renderSuggestion={(suggestion) => (
                                <div>
                                    {
                                        suggestion['1. symbol']
                                    } - {
                                        suggestion['2. name']
                                    } ({
                                        suggestion['4. region']
                                    })
                                </div>
                            )}
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
                    <div className="modal-footer justify-content-between">
                        <button
                            className="btn btn-danger"
                            data-bs-dismiss="modal"
                            onClick={() => {
                                props.del(selectedSymbol);
                            }}
                        >
                            Delete
                        </button>
                        <button
                            className="btn btn-primary"
                            data-bs-dismiss="modal"
                            onClick={() => {
                                props.save(selectedSymbol);
                            }}
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
