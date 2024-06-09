import { themes } from "../../constants";
import utils from "../../utils/Utils";
import * as actions from "./layoutActions";

let selectedTheme = themes.find(
    (tm) => tm.name === utils.getLSVariable("theme")
);
if (!selectedTheme) {
    selectedTheme = themes[0];
}

const initialState = {
    loading: false,
    width: 0,
    height: 0,
    theme: selectedTheme,
    sidebarCollapsed: false,
    sidebarProps: { link: null },
    dropDownElement: null,
    shownModal: null,
};

const layoutReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case actions.SET_LOADING_ACTION:
            return {
                ...state,
                loading: payload,
            };
        case actions.SET_SIZE_ACTION:
            return {
                ...state,
                width: payload.width,
                height: payload.height,
            };
        case actions.SET_THEME_ACTION:
            return {
                ...state,
                theme: payload,
            };
        case actions.TOGGLE_SIDEBAR_ACTION:
            return {
                ...state,
                sidebarCollapsed: !state.sidebarCollapsed,
            };
        case actions.SET_SIDEBAR_PROPS_ACTION:
            if (
                JSON.stringify({ ...state.sidebarProps, ...payload }) !==
                JSON.stringify({ ...state.sidebarProps })
            ) {
                return {
                    ...state,
                    sidebarProps: { ...state.sidebarProps, ...payload },
                };
            }
            return { ...state };
        case actions.SET_DROP_DOWN_ELEMENT_ACTION:
            return {
                ...state,
                dropDownElement: payload,
            };
        case actions.SET_SHOWN_MODAL_ACTION:
            return {
                ...state,
                shownModal: payload,
            };
        default:
            return state;
    }
};

export default layoutReducer;
