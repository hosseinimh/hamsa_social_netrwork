import React from "react";
import { useSelector } from "react-redux";

import { general } from "../../../constants/strings/fa";

const SearchBox = ({ children, pageUtils, onSubmit, onReset }) => {
    const layoutState = useSelector((state) => state.layoutReducer);

    return (
        <div className="block pd-20">
            <div className="field-title">{general.search}</div>
            <div>{children}</div>
            <div className="btns d-flex mt-10">
                <button
                    className="btn btn-primary mx-rdir-10"
                    type="button"
                    disabled={layoutState?.loading}
                    title={general.search}
                    onClick={pageUtils.useForm.handleSubmit(onSubmit)}
                >
                    {general.search}
                </button>
                <button
                    className="btn btn-border mx-rdir-10"
                    type="button"
                    disabled={layoutState?.loading}
                    title={general.reset}
                    onClick={onReset}
                >
                    {general.reset}
                </button>
            </div>
        </div>
    );
};

export default SearchBox;
