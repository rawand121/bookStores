import * as t from "../actions/actionType";

const initialState = {
  loading: false,
  success: false,
  books: {},
  error: null,
};

const latestReducer = (state = initialState, action) => {
  switch (action.type) {
    case t.GET_LAST_REQ:
      return {
        loading: true,
        books: {},
        success: false,
        error: null,
      };
    case t.GET_LAST_SUCCESS:
      return {
        loading: false,
        success: true,
        books: action.books,
        error: null,
      };
    case t.GET_LAST_FAIL:
      return {
        loading: false,
        books: null,
        success: false,
        error: action.err,
      };
    default:
      return {
        ...state,
      };
  }
};

export default latestReducer;
