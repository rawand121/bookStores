import * as t from "../actions/actionType";

const initialState = {
  loading: false,
  success: false,
  books: {},
  error: null,
};

const booksReducer = (state = initialState, action) => {
  switch (action.type) {
    case t.FETCH_BOOKS_REQ:
      return {
        loading: true,
        books: {},
        success: false,
        error: null,
      };
    case t.FETCH_BOOKS_SUCCESS:
      return {
        loading: false,
        success: true,
        books: {books : action.books, pageCount : action.pageCount, itemCount : action.itemCount},
        error: null,
      };
    case t.FETCH_BOOKS_FAIL:
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

export default booksReducer;
