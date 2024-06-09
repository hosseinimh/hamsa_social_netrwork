import React from "react";

import { BASE_PATH } from "../../../constants";
import { Footer } from "../";
import { general as strings } from "../../../constants/strings/fa";

const FallbackError = () => {
    return (
        <div className="dashboard d-flex">
            <div className="main">
                <div className="center">
                    <div className="dashboard-content">
                        <div className="content-title">
                            <h2>{strings.brandLogo}</h2>
                        </div>
                        <div className="section fix-mr15">
                            <div
                                className="block pd-15"
                                style={{ textAlign: "center" }}
                            >
                                <div className="alert mb-20 alert-danger">
                                    {strings.fallbackError}
                                </div>
                                <a className="btn btn-primary" href={BASE_PATH}>
                                    {strings.fallbackReturnHome}
                                </a>
                            </div>
                        </div>
                    </div>
                    <Footer />
                </div>
            </div>
        </div>
    );
};

export default FallbackError;
