import * as t from "./actionType";
import axios from "../../AxiosConfig";

export const getLatest = () => {
  return async (dispatch) => {
    dispatch(getLatestReq());
    try {
      const { data } = await axios.get(`/api/latest`);
      dispatch(getLastSuccess(data));
    } catch (err) {
      console.log(err);
      dispatch(getLastFail(err.response.data.message));
      console.log(err.response.data.message);
    }
  };
};

const getLatestReq = () => {
  return {
    type: t.GET_LAST_REQ,
  };
};

const getLastSuccess = (books) => {
  return {
    type: t.GET_LAST_SUCCESS,
    books,
  };
};

const getLastFail = (err) => {
  return {
    type: t.GET_LAST_FAIL,
    err,
  };
};
