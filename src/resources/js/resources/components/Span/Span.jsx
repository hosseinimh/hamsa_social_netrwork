import React from "react";
import { useSelector } from "react-redux";

const Span = ({ children, className = "", spanStyle = {} }) => {
    const layoutState = useSelector((state) => state.layoutReducer);

    return (
        <p className="placeholder-glow d-inline mx-2">
            <span
                className={
                    layoutState?.loading
                        ? `d-inline placeholder ${className}`
                        : `${className}`
                }
                style={{ ...spanStyle }}
            >
                {layoutState?.loading && <></>}
                {!layoutState?.loading && <>{children}</>}
            </span>
        </p>
    );
};

export default Span;
