import React from 'react';
import ReactDOM from 'react-dom';

const Modal = (props) => {
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
                        Test Modal
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
