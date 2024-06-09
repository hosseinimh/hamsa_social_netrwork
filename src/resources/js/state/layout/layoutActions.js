import { themes } from "../../constants";
import utils from "../../utils/Utils";

export const SET_LOADING_ACTION = "SET_LOADING_ACTION";
export const SET_SIZE_ACTION = "SET_SIZE_ACTION";
export const SET_THEME_ACTION = "SET_THEME_ACTION";
export const TOGGLE_SIDEBAR_ACTION = "TOGGLE_SIDEBAR_ACTION";
export const SET_SIDEBAR_PROPS_ACTION = "SET_SIDEBAR_PROPS_ACTION";
export const SET_DROP_DOWN_ELEMENT_ACTION = "SET_DROP_DOWN_ELEMENT_ACTION";
export const SET_SHOWN_MODAL_ACTION = "SET_SHOWN_MODAL_ACTION";

export const setLoadingAction = (loading) => async (dispatch) => {
    dispatch({
        type: SET_LOADING_ACTION,
        payload: loading,
    });
};

export const setSizeAction = (width, height) => async (dispatch) => {
    dispatch({
        type: SET_SIZE_ACTION,
        payload: { width, height },
    });
};

export const setThemeAction = (theme) => async (dispatch) => {
    let t = themes.find((tm) => tm.name === theme);
    if (!t) {
        return;
    }
    utils.setTheme(t);
    dispatch({
        type: SET_THEME_ACTION,
        payload: t,
    });
};

export const toggleSidebarAction = () => async (dispatch) => {
    dispatch({
        type: TOGGLE_SIDEBAR_ACTION,
    });
};

export const setSidebarPropsAction = (props) => async (dispatch) => {
    dispatch({
        type: SET_SIDEBAR_PROPS_ACTION,
        payload: props,
    });
};

export const setDropDownElementAction = (element) => async (dispatch) => {
    dispatch({
        type: SET_DROP_DOWN_ELEMENT_ACTION,
        payload: element,
    });
};

export const setShownModalAction =
    (modal, props = null) =>
    async (dispatch) => {
        dispatch({
            type: SET_SHOWN_MODAL_ACTION,
            payload: { modal, props },
        });
    };
