import React from "react";

import { footer as strings } from "../../../constants/strings/fa";

const Footer = () => {
    return (
        <div className="copyright text-center">
            <p>{strings.text}</p>
            <div>{strings.version}</div>
        </div>
    );
};

export default Footer;
