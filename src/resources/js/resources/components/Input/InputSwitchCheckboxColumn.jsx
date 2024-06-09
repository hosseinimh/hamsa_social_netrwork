import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const InputSwitchCheckboxColumn = ({
    field,
    useForm,
    strings,
    checked = false,
}) => {
    const ls = useSelector((state) => state.layoutReducer);
    const [label, setLabel] = useState(
        strings && field in strings ? strings[field] : ""
    );
    const [form, setForm] = useState(useForm);

    useEffect(() => {
        if (!strings) {
            setLabel(
                ls?.pageProps?.strings && field in ls.pageProps.strings
                    ? ls?.pageProps?.strings[field]
                    : ""
            );
        }

        if (!useForm) {
            setForm(ls?.pageProps?.useForm);
        }
    }, [ls]);

    return (
        <div className="form-check form-switch">
            <input
                {...form?.register(field)}
                className="form-check-input"
                id={field}
                type="checkbox"
                disabled={ls?.loading}
                defaultChecked={checked}
            />
            <label className="form-check-label" htmlFor={field}>
                {label}
            </label>
        </div>
    );
};

export default InputSwitchCheckboxColumn;
