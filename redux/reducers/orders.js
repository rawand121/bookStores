import * as t from "../actions/actionType";

const initialState = {
  loading: false,
  success: false,
  error: null,
};

const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case t.SET_ORDER_REQ:
      return {
        loading: true,
        success: false,
        error: null,
      };
    case t.SET_ORDER_SUCCESS:
      return {
        loading: false,
        success: true,
        error: null,
      };
    case t.SET_ORDER_FAIL:
      return {
        loading: false,
        success: false,
        error: action.err,
      };
    case t.SET_ORDER_RESET:
      return {
        loading: false,
        success: false,
        error: null,
      };
    default:
      return {
        ...state,
      };
  }
};

export default orderReducer;
