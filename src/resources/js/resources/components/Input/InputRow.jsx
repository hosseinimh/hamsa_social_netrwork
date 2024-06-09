import React from "react";

const InputRow = ({ children, containerStyle = null }) => {
  return (
    <div className="list-input" style={{ ...containerStyle }}>
      {children}
    </div>
  );
};

export default InputRow;
