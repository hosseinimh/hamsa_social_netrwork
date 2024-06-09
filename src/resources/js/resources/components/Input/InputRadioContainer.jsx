import React from "react";

const InputRadioContainer = ({ children, label, containerClassName = "" }) => {
    return (
        <div className={`list-input ${containerClassName}`}>
            {label && <div className="input-info">{label}</div>}
            <div className="d-flex align-center input-radio mb-30">
                {children}
            </div>
        </div>
    );
};

export default InputRadioContainer;
