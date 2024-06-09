import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import InputRow from "./InputRow";
import { general, validation } from "../../../constants/strings/fa";

const InputFileColumn = ({
    field,
    accept = ".jpg, .jpeg, .png, .pdf, .doc, .docx",
    onChangeFile,
    useForm,
    strings,
    fullRow = true,
    file = null,
    showFile = false,
    maxSize = 0,
    onRemoveFile = null,
}) => {
    const layoutState = useSelector((state) => state.layoutReducer);
    const pageState = useSelector((state) => state.pageReducer);
    const [label, setLabel] = useState(
        strings && field in strings ? strings[field] : ""
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
        }

        if (!useForm) {
            setForm(pageState?.pageUtils?.useForm);
        }
    }, [pageState]);

    const renderItem = () => (
        <div className="d-flex align-center">
            <label
                className={`input-file input-border ${
                    maxSize > 0 && file?.size > maxSize
                        ? "error mb-40"
                        : "mb-30"
                }`}
            >
                <input
                    type="file"
                    className="file-input"
                    {...form?.register(`${field}`)}
                    id={field}
                    disabled={layoutState?.loading}
                    accept={accept}
                    onChange={(e) => onChangeFile(e)}
                />
                <div className={`overhide ${file ? "text" : "placeholder"}`}>
                    {file ? file.name : label}
                </div>
                <i className="icon-import"></i>
                {maxSize > 0 && file?.size > maxSize && (
                    <span className="error">
                        {validation.fileMaxSizeMessage}
                    </span>
                )}
            </label>
            {file && showFile && (
                <div
                    title={general.remove}
                    className={`remove-file mt-10 ${
                        maxSize > 0 && file?.size > maxSize ? "mb-40" : "mb-30"
                    }`}
                    onClick={() => {
                        onRemoveFile && onRemoveFile();
                    }}
                >
                    <i className="icon-trash"></i>
                </div>
            )}
        </div>
    );

    if (fullRow) {
        return <InputRow>{renderItem()}</InputRow>;
    }
    return renderItem();
};

export default InputFileColumn;
