import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const InputCheckboxColumn = ({
    name,
    field,
    useForm,
    strings,
    checked,
    onChange = null,
}) => {
    const layoutState = useSelector((state) => state.layoutReducer);
    const pageState = useSelector((state) => state.pageReducer);
    const [label, setLabel] = useState(
        strings && field in strings ? strings[field] : ""
    );
    const [form, setForm] = useState(useForm);
    const [element, setElement] = useState(null);

    useEffect(() => {
        if (!strings) {
            setLabel(
                pageState?.pageUtils?.strings &&
                    field in pageState.pageUtils.strings
                    ? pageState?.pageUtils?.strings[field]
                    : ""
            );
        }

        if (!useForm) {
            setForm(pageState?.pageUtils?.useForm);
        }
    }, [pageState]);

    useEffect(() => {
        if (form && checked) {
            form?.setValue(field, checked);
        }
    }, [form]);

    useEffect(() => {
        if (element && onChange) {
            onChange({ target: { id: field, checked: element.checked } });
        }
    }, [element?.checked]);

    useEffect(() => {
        setElement(document.getElementById(field));
    }, []);

    return (
        <div>
            <input
                {...form?.register(name)}
                id={field}
                name={name}
                value={field}
                type="checkbox"
                disabled={layoutState?.loading}
            />
            <label htmlFor={field}>{label}</label>
        </div>
    );
};

export default InputCheckboxColumn;
