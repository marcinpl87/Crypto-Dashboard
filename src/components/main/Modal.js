import React, {
    useState,
    useEffect,
} from 'react';
import ReactDOM from 'react-dom';
import Suggest from './SuggestApi';

const Modal = (props) => {
    const [
        fetchAndType,
        setFetchAndType,
    ] = useState({
        fetch: false,
        type: false,
    });
    let selectedSymbol = '';
    useEffect(() => {
        document
            .getElementById(
                props.modalId
            )
            .addEventListener(
                'hidden.bs.modal',
                () => {
                    setFetchAndType({
                        fetch: fetchAndType.fetch,
                        type: false,
                    });
                }
            );
    }, []);
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
                        {fetchAndType.type
                            ? <React.Fragment>
                                <label htmlFor="symbol" className="form-label">
                                    {fetchAndType.type == "crypto"
                                        ? "Token name or symbol"
                                        : "Stock ticker or company name"}
                                </label>
                                <Suggest
                                    id="symbol"
                                    className="form-control"
                                    placeholder={fetchAndType.type == "crypto"
                                        ? "e.g. btc or bitcoin"
                                        : "e.g. gme or gamestop"}
                                    endpoint={fetchAndType.type == "crypto"
                                        ? "search-crypto"
                                        : "search"}
                                    getSuggestionValue={(suggestion) => {
                                        if (fetchAndType.type == "crypto") {
                                            selectedSymbol = suggestion['id'];
                                            return suggestion['id'];
                                        }
                                        else {
                                            selectedSymbol = suggestion['1. symbol'];
                                            return suggestion['1. symbol'];
                                        }
                                    }}
                                    renderSuggestion={(suggestion) => (
                                        <div>
                                            {fetchAndType.type == "crypto"
                                                ? <React.Fragment>
                                                    {
                                                        suggestion['symbol']
                                                    } - {
                                                        suggestion['name']
                                                    }
                                                </React.Fragment>
                                                : <React.Fragment>
                                                    {
                                                        suggestion['1. symbol']
                                                    } - {
                                                        suggestion['2. name']
                                                    } ({
                                                        suggestion['4. region']
                                                    })
                                                </React.Fragment>
                                            }
                                        </div>
                                    )}
                                    onFetchStart={() => {
                                        setFetchAndType({
                                            fetch: true,
                                            type: fetchAndType.type,
                                        });
                                    }}
                                    onFetchStop={() => {
                                        setFetchAndType({
                                            fetch: false,
                                            type: fetchAndType.type,
                                        });
                                    }}
                                />
                                <div className="form-text">
                                    {fetchAndType.fetch
                                        ? <span>Loading {fetchAndType.type == "crypto"
                                            ? "tokens"
                                            : "tickers"}...</span>
                                        : <span>&nbsp;</span>
                                    }
                                </div>
                            </React.Fragment>
                            : <div className="d-flex justify-content-around">
                                <button
                                    className="btn btn-primary"
                                    onClick={() => {
                                        setFetchAndType({
                                            fetch: fetchAndType.fetch,
                                            type: "crypto",
                                        });
                                    }}
                                >
                                    Crypto market
                                </button>
                                <button
                                    className="btn btn-primary"
                                    onClick={() => {
                                        setFetchAndType({
                                            fetch: fetchAndType.fetch,
                                            type: "stock",
                                        });
                                    }}
                                >
                                    Stock market
                                </button>
                            </div>
                        }
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
                                props.save(
                                    fetchAndType.type,
                                    selectedSymbol
                                );
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
