import React from "react";

const Card = ({ children }) => {
  return (
    <div className="block pd-20 grow-2 basis400 d-flex align-center">
      {children}
    </div>
  );
};

export default Card;
