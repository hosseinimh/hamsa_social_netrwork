import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const InputButtonRadiosColumn = ({
  items,
  name,
  useForm,
  strings,
  separate = false,
}) => {
  const layoutState = useSelector((state) => state.layoutReducer);
  const pageState = useSelector((state) => state.pageReducer);
  const [label, setLabel] = useState(
    strings && name in strings ? strings[name] : ""
  );
  const [form, setForm] = useState(useForm);
  const [radioItems, setRadioItems] = useState(null);
  const field = `${name}_hidden`;

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
    if (items?.length > 0) {
      setRadioItems(items);
    }
  }, [items]);

  useEffect(() => {
    if (radioItems?.length > 0) {
      form?.setValue(field, radioItems.find((item) => item.checked).value);
    }
  }, [radioItems]);

  const renderdItems = () => (
    <div
      className={`${separate ? "" : "bg-dark p-1"} d-flex`}
      style={{ borderRadius: separate ? "0" : "5px" }}
    >
      {radioItems?.map((item) => (
        <React.Fragment key={item.id}>
          {separate && (
            <div className="mx-rdir-10" style={{ borderRadius: "5px" }}>
              {renderItem(item)}
            </div>
          )}
          {!separate && renderItem(item)}
        </React.Fragment>
      ))}
    </div>
  );

  const renderItem = (item) => (
    <>
      <input
        className="d-none"
        id={`${name}_input_field_${item.id}`}
        name={name}
        type="radio"
        value={item.id}
        disabled={layoutState?.loading}
        onChange={(e) => {
          item.checked = e.target.checked;
          setRadioItems((items) => {
            return items.map((i) => {
              i.checked = i.id === item.id ? item.checked : false;
              return i;
            });
          });
        }}
      />
      <label
        className={`m-0 btn ${item.checked ? "btn-primary" : ""}`}
        htmlFor={`${name}_input_field_${item.id}`}
      >
        {item.label}
      </label>
    </>
  );

  return (
    <>
      <div className="block-title">
        <h3>{label}</h3>
      </div>
      <div className="mt-10 mb-20 d-flex">
        {radioItems?.length > 0 && renderdItems()}
      </div>
      <input type="hidden" name={name} {...form?.register(field)} />
    </>
  );
};

export default InputButtonRadiosColumn;
