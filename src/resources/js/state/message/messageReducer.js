import { MESSAGE_CODES } from "../../constants";
import * as actions from "./messageActions";

const initialState = {
  message: null,
  messageType: null,
  messageCode: 0,
  messageRender: false,
  messageField: null,
};

const messageReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case actions.SET_MESSAGE_ACTION:
      return {
        message: payload.message,
        messageType: payload.messageType,
        messageCode:
          parseInt(payload.messageCode) ?? MESSAGE_CODES.CLIENT_ERROR,
        messageRender: payload.messageRender,
        messageField: payload.messageField,
      };
    case actions.SET_RENDER_MESSAGE:
      return {
        ...state,
        messageRender: true,
      };
    case actions.CLEAR_MESSAGE_ACTION:
      return {
        message: null,
        messageType: null,
        messageCode: 0,
        messageRender: false,
        messageField: null,
      };
    default:
      return state;
  }
};

export default messageReducer;
