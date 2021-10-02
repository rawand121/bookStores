import * as t from "./actionType";
import axios from "../../AxiosConfig";

export const registerUser = (user) => {
  return async (dispatch) => {
    dispatch(registerRequest());
    try {
      await axios.post("/api/signup", user);
      dispatch(registerSuccess());
    } catch (err) {
      dispatch(registerFail(err.response.data.message));
    }
  };
};

export const LoadUser = () => {
  return async (dispatch) => {
    dispatch(SigninRequest());
    try {
      const { data } = await axios.get(`/api/auth/me`);
      dispatch(signinSuccess(data));
    } catch (err) {
      dispatch(signinFail(err.response.data.message));
    }
  };
};

const registerRequest = () => {
  return {
    type: t.USER_SIGNUP_REQ,
  };
};

const registerSuccess = () => {
  return {
    type: t.USER_SIGNUP_SUCCESS,
  };
};

const registerFail = (err) => {
  return {
    type: t.USER_SIGNUP_FAIL,
    err,
  };
};

const SigninRequest = () => {
  return {
    type: t.USER_SIGNIN_REQ,
  };
};

const signinSuccess = (user) => {
  return {
    type: t.USER_SIGNIN_SUCCESS,
    user,
  };
};

const signinFail = (err) => {
  return {
    type: t.USER_SIGNIN_FAIL,
    err,
  };
};
