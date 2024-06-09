import React from "react";

const CustomLink = ({
    onClick,
    children,
    className = "",
    style = {},
    link = "",
}) => {
    return (
        <a
            href={link === "" ? "#" : link}
            onClick={(e) => {
                e.preventDefault();
                onClick && onClick(e);
            }}
            className={className}
            style={style}
        >
            {children}
        </a>
    );
};

export default CustomLink;
