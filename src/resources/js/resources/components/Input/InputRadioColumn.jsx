import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const InputRadioColumn = ({
  field,
  name,
  useForm,
  strings,
  checked = false,
  onChange = null,
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
        pageState?.pageUtils?.strings && field in pageState.pageUtils.strings
          ? pageState?.pageUtils?.strings[field]
          : ""
      );
    }

    if (!useForm) {
      setForm(pageState?.pageUtils?.useForm);
    }
  }, [pageState]);

  useEffect(() => {
    if (checked) {
      resetValues();
      form?.setValue(field, "on");
    }
  }, [form]);

  const resetValues = () => {
    document.querySelectorAll(`[name="${name}"]`).forEach((node) => {
      if (node.id !== field) {
        form?.setValue(node.id, null);
      }
    });
  };

  return (
    <div className="mx-rdir-20">
      <input
        {...form?.register(field)}
        id={field}
        name={name}
        type="radio"
        disabled={layoutState?.loading}
        onChange={(e) => {
          resetValues();
          e.target.checked
            ? form?.setValue(field, "on")
            : form?.setValue(field, null);

          if (onChange) {
            onChange(e, field);
          }
        }}
      />
      <label htmlFor={field}>{label}</label>
    </div>
  );
};

export default InputRadioColumn;
