export const SET_MESSAGE_ACTION = "SET_MESSAGE_ACTION";
export const SET_RENDER_MESSAGE = "SET_RENDER_MESSAGE";
export const CLEAR_MESSAGE_ACTION = "CLEAR_MESSAGE_ACTION";

export const setMessageAction =
    (
        message,
        messageType,
        messageCode,
        messageRender = true,
        messageField = null
    ) =>
    async (dispatch) => {
        dispatch({
            type: SET_MESSAGE_ACTION,
            payload: {
                message,
                messageType,
                messageCode,
                messageRender,
                messageField,
            },
        });
    };

export const setRenderMessageAction = () => async (dispatch) => {
    dispatch({
        type: SET_RENDER_MESSAGE,
    });
};

export const clearMessageAction = () => async (dispatch) => {
    dispatch({
        type: CLEAR_MESSAGE_ACTION,
    });
};
