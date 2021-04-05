import React from "react";
import "./modal.scss";

const Modal = ({components}) => {
    return (
        <div className="modal">
            {components.map(({component : Component, children, props}) => 
                <Component components={children} {...props}/>
            )}
        </div>
    );
}

export default Modal;
