import * as t from "./actionType";
import axios from "../../AxiosConfig";

export const getUsedBooks = (page, name, writer, category) => {
  return async (dispatch) => {
    try {
      let url = `/api/usedBooks?page=${page}&limit=8`;
      if (name) {
        url = `/api/usedBooks?page=${page}&limit=8&name=${name}`;
      }
      if (writer) url = url.concat(`&writer=${writer}`);
      if (category) url = url.concat(`&category=${category}`);

      const { data } = await axios.get(url);
      dispatch(FetchBooksSuccess(data.books, data.pageCount, data.itemCount));
    } catch (err) {
      dispatch(FetchBooksFail(err.response.data.error.message));
    }
  };
};

const FetchBooksSuccess = (books, pageCount, itemCount) => {
  return {
    type: t.FETCH_USED_BOOKS_SUCCESS,
    books,
    itemCount,
    pageCount,
  };
};

const FetchBooksFail = (err) => {
  return {
    type: t.FETCH_USED_BOOKS_FAIL,
    err,
  };
};
