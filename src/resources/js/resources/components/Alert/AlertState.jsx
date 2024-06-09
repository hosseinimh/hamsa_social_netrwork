import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import { MESSAGE_TYPES } from "../../../constants";

const AlertState = () => {
  const messageState = useSelector((state) => state.messageReducer);
  const [message, setMessage] = useState(null);
  const [type, setType] = useState(0);

  useEffect(() => {
    if (
      messageState?.messageType === MESSAGE_TYPES.ERROR ||
      messageState?.messageType === MESSAGE_TYPES.SUCCESS
    ) {
      try {
        if (messageState?.message) {
          if (messageState?.messageRender) {
            setMessage(messageState?.message.toString());
            setType(messageState?.messageType);
          }
        }
      } catch {}
    } else {
      setMessage(null);
    }
  }, [messageState]);

  useEffect(() => {
    if (message) {
      window.scrollTo(0, 0);
    }
  }, [message]);

  if (message) {
    return (
      <div
        className={`alert mb-20 ${
          type === MESSAGE_TYPES.ERROR ? "alert-danger" : "alert-success"
        }`}
      >
        {message}
      </div>
    );
  }

  return <></>;
};

export default AlertState;
