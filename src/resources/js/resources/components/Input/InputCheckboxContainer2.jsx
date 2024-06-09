import React from "react";

const InputCheckboxContainer2 = ({ children, label }) => {
    return (
        <div>
            {label && <div className="input-info">{label}</div>}
            {children}
        </div>
    );
};

export default InputCheckboxContainer2;
