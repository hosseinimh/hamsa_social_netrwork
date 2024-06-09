import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import InputRow from "./InputRow";

const InputTextAreaColumn = ({
  field,
  useForm,
  strings,
  showLabel,
  fullRow = true,
  readonly = false,
  value = null,
  textAlign = "",
  direction = undefined,
  inputStyle = null,
}) => {
  const layoutState = useSelector((state) => state.layoutReducer);
  const pageState = useSelector((state) => state.pageReducer);
  const messageState = useSelector((state) => state.messageReducer);
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
        pageState?.pageUtils?.strings && field in pageState.pageUtils.strings
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
    if (form && value) {
      form?.setValue(field, value);
    }
  }, [form]);

  const renderItem = () => {
    let style;
    if (textAlign === "left") {
      style = { ...inputStyle, textAlign, direction: direction ?? "ltr" };
    } else if (textAlign === "right") {
      style = { ...inputStyle, textAlign, direction: direction ?? "rtl" };
    } else {
      style = { ...inputStyle };
    }
    return (
      <div>
        {showLabel && <div className="input-info">{label}</div>}
        <div
          className={`input-text input-bg input-border ${
            messageState?.messageField === field ? "error mb-40" : "mb-30"
          }`}
          style={{
            minHeight: "100px",
          }}
        >
          <textarea
            {...form?.register(field)}
            id={field}
            className="textarea"
            style={{
              minHeight: "100px",
              paddingTop: "15px",
              paddingBottom: "15px",
              ...style,
              ...inputStyle,
            }}
            placeholder={placeholder}
            disabled={layoutState?.loading}
            readOnly={readonly}
          />
          {messageState?.messageField === field && (
            <span className="error">{messageState?.message}</span>
          )}
        </div>
      </div>
    );
  };

  if (fullRow) {
    return <InputRow>{renderItem()}</InputRow>;
  }
  return renderItem();
};

export default InputTextAreaColumn;
