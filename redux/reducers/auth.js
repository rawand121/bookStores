import * as t from "../actions/actionType";

const initialState = {
  loading: false,
  success: false,
  user: null,
  error: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case t.USER_SIGNIN_REQ:
      return {
        loading: true,
        user: null,
        success: false,
        error: null,
      };
    case t.USER_SIGNIN_SUCCESS:
      return {
        loading: false,
        success: true,
        user: action.user,
        error: null,
      };
    case t.USER_SIGNIN_FAIL:
      return {
        loading: false,
        user: null,
        success: false,
        error: action.err,
      };
    default:
      return {
        ...state,
      };
  }
};

export default userReducer;
