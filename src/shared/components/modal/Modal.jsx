import React from "react";
import { service } from "../../service";
import { useService } from "@xstate/react";
import "./modal.scss";

const Modal = ({components}) => {
    const [state, send] = useService(service);
    // Here we do the same thing as in App.js. We loop through our components and render them according to the componentTree.

    return (
        <>
            <div className="modal-overlay"></div>
            <div className="modal-wrapper p-5 rounded">
                <button 
                    type="button" 
                    className="modal-wrapper__close btn-close p-3" 
                    aria-label="Close" 
                    onClick={() => {send("MODAL_CLOSE")}}>
                </button>
                {components.map(({component : Component, children, props}) => 
                    <Component components={children} {...props}/>
                )}
            </div>
        </>
    );
}

export default Modal;
