import * as t from "../actions/actionType";

const initialState = {
  books: {},
  error: null,
};

const usedBooksReducer = (state = initialState, action) => {
  switch (action.type) {
    case t.FETCH_USED_BOOKS_SUCCESS:
      return {
        books: {
          books: action.books,
          pageCount: action.pageCount,
          itemCount: action.itemCount,
        },
        error: null,
      };
    case t.FETCH_USED_BOOKS_FAIL:
      return {
        books: null,
        error: action.err,
      };
    default:
      return {
        ...state,
      };
  }
};

export default usedBooksReducer;
