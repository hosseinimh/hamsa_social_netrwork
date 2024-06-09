import React from "react";
import { useSelector } from "react-redux";

import { general } from "../../../constants/strings/fa";

const FormCard = ({
    children,
    pageUtils,
    hasSubmit = true,
    submitEnabled = true,
    onSubmit = null,
    hasCancel = true,
}) => {
    const layoutState = useSelector((state) => state.layoutReducer);

    return (
        <div className="block pd-20 pd-d-10">
            {children}
            <div className="block-border"></div>
            <div className="btns d-flex mt-30 mb-10">
                {hasSubmit && (
                    <button
                        className="btn btn-success"
                        type="button"
                        title={
                            pageUtils?.strings && "submit" in pageUtils.strings
                                ? pageUtils.strings["submit"]
                                : general.submit
                        }
                        onClick={pageUtils?.useForm.handleSubmit(
                            onSubmit ?? pageUtils.onSubmit
                        )}
                        disabled={layoutState?.loading || !submitEnabled}
                    >
                        {pageUtils?.strings && "submit" in pageUtils.strings
                            ? pageUtils.strings["submit"]
                            : general.submit}
                    </button>
                )}
                {hasCancel && (
                    <button
                        className="btn btn-border"
                        type="button"
                        title={
                            pageUtils?.strings && "cancel" in pageUtils.strings
                                ? pageUtils.strings["cancel"]
                                : general.cancel
                        }
                        onClick={pageUtils?.onCancel}
                        disabled={layoutState?.loading}
                    >
                        {pageUtils?.strings && "cancel" in pageUtils.strings
                            ? pageUtils.strings["cancel"]
                            : general.cancel}
                    </button>
                )}
            </div>
        </div>
    );
};

export default FormCard;
