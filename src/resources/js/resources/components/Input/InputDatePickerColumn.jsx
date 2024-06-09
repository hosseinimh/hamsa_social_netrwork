import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";

import InputRow from "./InputRow";
import utils from "../../../utils/Utils";

const InputDatePickerColumn = ({
    field,
    value = null,
    useForm,
    strings = null,
    showLabel = false,
    fullRow = true,
    readOnly = false,
}) => {
    const layoutState = useSelector((state) => state.layoutReducer);
    const pageState = useSelector((state) => state.pageReducer);
    const messageState = useSelector((state) => state.messageReducer);
    const [date, setDate] = useState();
    const [label, setLabel] = useState(
        strings && field in strings ? strings[field] : ""
    );
    const [placeholder, setPlaceholder] = useState(
        strings && `${field}Placeholder` in strings
            ? strings[`${field}Placeholder`]
            : ""
    );
    const [form, setForm] = useState(useForm);

    useEffect(() => {
        if (!strings) {
            setLabel(
                pageState?.pageUtils?.strings &&
                    field in pageState.pageUtils.strings
                    ? pageState?.pageUtils?.strings[field]
                    : ""
            );
            setPlaceholder(
                pageState?.pageUtils?.strings &&
                    `${field}Placeholder` in pageState.pageUtils.strings
                    ? pageState.pageUtils.strings[`${field}Placeholder`]
                    : ""
            );
        }

        if (!useForm) {
            setForm(pageState?.pageUtils?.useForm);
        }
    }, [pageState]);

    useEffect(() => {
        if (messageState?.messageField === field) {
            document.querySelector(`#${field}`).select();
        }
    }, [messageState]);

    useEffect(() => {
        if (form && value) {
            form?.setValue(field, utils.convertNumberToEnglish(value));
            setDate(value);
        }
    }, [form]);

    useEffect(() => {
        if (form && date) {
            const parts = date.split("/");
            if (parts.length === 3 && parts[1].length === 1) {
                parts[1] = `0${parts[1]}`;
            }
            form?.setValue(
                field,
                utils.convertNumberToEnglish(parts.join("/"))
            );
        }
    }, [date]);

    useEffect(() => {
        if (form?.getValues(field)) {
            setDate(form?.getValues(field));
        }
    }, [form?.getValues(field)]);

    const renderItem = () => (
        <div className="d-flex d-flex-column">
            {showLabel && <div className="input-info">{label}</div>}
            <div
                className={`input-text input-bg input-border ${
                    messageState?.messageField === field
                        ? "error mb-40"
                        : "mb-30"
                }`}
            >
                {form && (
                    <>
                        <DatePicker
                            calendar={persian}
                            locale={persian_fa}
                            placeholder={placeholder}
                            calendarPosition="bottom-right"
                            onChange={(e) => {
                                setDate(e?.toString());
                            }}
                            id={field}
                            value={form?.getValues(field)}
                            disabled={layoutState?.loading || readOnly}
                        />
                        {messageState?.messageField === field && (
                            <span className="error">
                                {messageState?.message}
                            </span>
                        )}
                        <div className="icon">
                            <i className="icon-calendar-1"></i>
                        </div>
                    </>
                )}
            </div>
        </div>
    );

    if (fullRow) {
        return <InputRow>{renderItem()}</InputRow>;
    }
    return renderItem();
};

export default InputDatePickerColumn;
