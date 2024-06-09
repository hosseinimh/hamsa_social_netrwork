import React from "react";
import { useSelector } from "react-redux";

const TopLoadingBar = () => {
  const layoutState = useSelector((state) => state.layoutReducer);

  if (layoutState?.loading) {
    return (
      <div className="loader-wrapper">
        <span className="loader"></span>
      </div>
    );
  }

  return <></>;
};

export default TopLoadingBar;
