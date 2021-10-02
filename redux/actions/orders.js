import * as t from "./actionType";
import axios from "axios";

export const setOrder = (address, note) => {
  return async (dispatch) => {
    dispatch(setOrderRequest());
    try {
      const existLocal = JSON.parse(localStorage.getItem("basket"));
      if (existLocal === null) {
        dispatch(
          setOrderFail("No Books found in your basket, please add some")
        );
      } else {
        let orders = [];
        existLocal.forEach((prod) => {
          orders.push({
            book: prod.book,
            bookStore: prod.bookStore,
            price: prod.price,
            qty: prod.quantity,
          });
        });
        await axios.post(`http://localhost:3000/api/order`, {
          address,
          orders,
          note,
        });

        dispatch(setOrderSuccess());
        setTimeout(() => {
          localStorage.removeItem("basket");
          dispatch({ type: t.SET_ORDER_RESET });
        }, 1000);
      }
    } catch (err) {
      console.log(err);
      dispatch(setOrderFail(err.response.data.message));
      console.log(err.response.data.message);
    }
  };
};

const setOrderRequest = () => {
  return {
    type: t.SET_ORDER_REQ,
  };
};

const setOrderSuccess = () => {
  console.log("HAW");
  return {
    type: t.SET_ORDER_SUCCESS,
  };
};

const setOrderFail = (err) => {
  return {
    type: t.SET_ORDER_FAIL,
    err,
  };
};
