import { combineReducers } from "redux";

import layoutReducer from "./layout/layoutReducer";
import messageReducer from "./message/messageReducer";
import pageReducer from "./page/pageReducer";

export default combineReducers({
    layoutReducer,
    messageReducer,
    pageReducer,
});
