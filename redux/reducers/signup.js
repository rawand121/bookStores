import * as t from "../actions/actionType";

const initialState = {
  loading: false,
  success: false,
  error: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case t.USER_SIGNUP_REQ:
      return {
        loading: true,
        user: null,
        success: false,
        error: null,
      };
    case t.USER_SIGNUP_SUCCESS:
      return {
        loading: false,
        user: null,
        success: true,
        error: null,
      };
    case t.USER_SIGNUP_FAIL:
      return {
        loading: false,
        success: false,
        error: action.err,
        user: null,
      };

    default:
      return {
        ...state,
      };
  }
};

export default userReducer;
