import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { slideUp, slideDown } from "es6-slide-up-down";
import { easeOutQuint } from "es6-easings";

import InputRow from "./InputRow";
import { setDropDownElementAction } from "../../../state/layout/layoutActions";

const InputSelectColumn = ({
  field,
  items,
  keyItem = "id",
  valueItem = "value",
  useForm,
  strings,
  noSelect = false,
  selectedValue = null,
  fullRow = true,
  showLabel = false,
  onChange = null,
  enabled = true,
}) => {
  const layoutState = useSelector((state) => state.layoutReducer);
  const pageState = useSelector((state) => state.pageReducer);
  const messageState = useSelector((state) => state.messageReducer);
  const dispatch = useDispatch();
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
    if (form && selectedValue) {
      selectOption(null, selectedValue);
      if (onChange) {
        onChange(null, selectedValue);
      }
    }
  }, [form]);

  useEffect(() => {
    form?.setValue(field, form?.getValues(field));

    if (!form?.getValues(field) && noSelect) {
      const el = document.getElementById(field);

      if (el) {
        el.value = "";
      }
    }
  }, [form?.formState]);

  useEffect(() => {
    const v = form?.getValues(field);
    if (v) {
      selectOption(null, v);
    }
  }, [form?.getValues(field)]);

  const showList = (e) => {
    e.stopPropagation();
    if (layoutState?.dropDownElement) {
      slideUp(layoutState.dropDownElement);
    }
    const element = document.querySelector(`#select-box-${field}`).lastChild;
    dispatch(setDropDownElementAction(element));
    slideDown(element, {
      duration: 400,
      easing: easeOutQuint,
    });
  };

  const selectOption = (e, value) => {
    e && e.stopPropagation();
    [...document.querySelectorAll(`.select-option-${field}`)].map((option) => {
      if (option.getAttribute("data-select") === `${value}`) {
        option.classList.add("active");
        document.querySelector(`.select-input-${field}`).value =
          option.innerText;
        form.setValue(field, value);
      } else {
        option.classList.remove("active");
      }
    });
    const element = document.querySelector(`#select-box-${field}`).lastChild;
    dispatch(setDropDownElementAction(null));
    if (layoutState?.dropDownElement === element) {
      slideUp(element);
    }
  };

  const renderItem = () => {
    const style = fullRow ? {} : { margin: "0.625rem 0.625rem 1.25rem" };
    return (
      <div className="d-flex d-flex-column">
        {showLabel && <div className="input-info">{label}</div>}
        <div className="select-box" id={`select-box-${field}`} style={style}>
          <div
            className={`select input-border ${
              messageState?.messageField === field ? "error mb-40" : "mb-30"
            }`}
            onClick={(e) => {
              enabled && showList(e);
            }}
          >
            <input type="text" className="selectval" name={field} hidden />
            <input
              type="text"
              className={`select-input select-input-${field}`}
              placeholder={label}
              autoComplete="off"
              readOnly
              name={field}
            />
            {messageState?.messageField === field && (
              <span className="error">{messageState?.message}</span>
            )}
            <div className="icon">
              <i className="icon-arrow-down-1"></i>
            </div>
          </div>
          <div className="select-list scrollhide dropdown-list">
            {items?.map((item) => (
              <div
                key={item[keyItem]}
                onClick={(e) => {
                  selectOption(e, item[keyItem]);
                  if (onChange) {
                    onChange(e, item[keyItem]);
                  }
                }}
                data-select={item[keyItem]}
                className={`select-option select-option-${field}`}
              >
                {item[valueItem]}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  if (form) {
    if (fullRow) {
      return <InputRow>{renderItem()}</InputRow>;
    }
    return renderItem();
  }
  return <></>;
};

export default InputSelectColumn;
