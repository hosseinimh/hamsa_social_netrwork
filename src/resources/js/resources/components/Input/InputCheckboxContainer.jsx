import React from "react";

const InputCheckboxContainer = ({
    children,
    label,
    containerClassName = "",
}) => {
    return (
        <div className={containerClassName}>
            {label && <div className="input-info">{label}</div>}
            <div className="d-flex-wrap align-center input-radio mb-30 gap-2">
                {children}
            </div>
        </div>
    );
};

export default InputCheckboxContainer;
