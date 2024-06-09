export const SET_PAGE_ACTION = "SET_PAGE_ACTION";
export const CLEAR_PROPS_ACTION = "CLEAR_PROPS_ACTION";
export const SET_PROPS_ACTION = "SET_PROPS_ACTION";
export const SET_PARAMS_ACTION = "SET_PARAMS_ACTION";
export const SET_DISPATCH_ACTION = "SET_DISPATCH_ACTION";
export const SET_NAVIGATE_ACTION = "SET_NAVIGATE_ACTION";
export const SET_TITLE_ACTION = "SET_TITLE_ACTION";
export const SET_PAGE_UTILS_ACTION = "SET_PAGE_UTILS_ACTION";

export const setPageAction = (page) => async (dispatch) => {
  dispatch({ type: SET_PAGE_ACTION, payload: page });
};

export const clearPagePropsAction = () => async (dispatch) => {
  dispatch({ type: CLEAR_PROPS_ACTION });
};

export const setPagePropsAction = (props) => async (dispatch) => {
  dispatch({ type: SET_PROPS_ACTION, payload: props });
};

export const setPageParamsAction = (params) => async (dispatch) => {
  dispatch({ type: SET_PARAMS_ACTION, payload: params });
};

export const setDispatchAction = (useDispatch) => async (dispatch) => {
  dispatch({ type: SET_DISPATCH_ACTION, payload: useDispatch });
};

export const setNavigateAction = (navigate) => async (dispatch) => {
  dispatch({
    type: SET_NAVIGATE_ACTION,
    payload: navigate,
  });
};

export const setPageTitleAction = (title, subTitle) => async (dispatch) => {
  dispatch({
    type: SET_TITLE_ACTION,
    payload: { title, subTitle },
  });
};

export const setPageUtilsAction = (pageUtils) => async (dispatch) => {
  dispatch({ type: SET_PAGE_UTILS_ACTION, payload: pageUtils });
};
