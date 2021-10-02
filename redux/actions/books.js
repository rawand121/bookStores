import * as t from "./actionType";
import axios from "axios";

export const getBooks = (page, name, writer, category) => {
  return async (dispatch) => {
    dispatch(requestBooks());
    try {
      let url = `http://localhost:3000/api/books?page=${page}&limit=8`;
      if (name) {
        url = `http://localhost:3000/api/books?page=${page}&limit=8&name=${name}`;
      }
      if (writer) url = url.concat(`&writer=${writer}`);
      if (category) url = url.concat(`&category=${category}`);

      const { data } = await axios.get(url);
      dispatch(FetchBooksSuccess(data.books, data.pageCount, data.itemCount));
    } catch (err) {
      dispatch(FetchBooksFail(err.response.data.error.message));
      console.log(err.response.data.error.message);
    }
  };
};

const requestBooks = () => {
  return {
    type: t.FETCH_BOOKS_REQ,
  };
};

const FetchBooksSuccess = (books, pageCount, itemCount) => {
  return {
    type: t.FETCH_BOOKS_SUCCESS,
    books,
    itemCount,
    pageCount,
  };
};

const FetchBooksFail = (err) => {
  return {
    type: t.FETCH_BOOKS_FAIL,
    err,
  };
};
