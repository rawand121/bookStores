import { createStore, applyMiddleware } from "redux";
import { HYDRATE, createWrapper } from "next-redux-wrapper";
import thunkMiddleware from "redux-thunk";
import reducers from "./reducers/index";

const bindMiddlware = (middlware) => {
  if (process.env.NODE_ENV !== "production") {
    const { composeWithDevTools } = require("redux-devtools-extension");
    return composeWithDevTools(applyMiddleware(...middlware));
  }

  return applyMiddleware(...middlware);
};

const reducer = (state, action) => {
  if (action.type === "__NEXT_REDUX_WRAPPER_HYDRATE__") {
    const nextState = {
      ...state, // use previous state
      ...action.payload, // apply delta from hydration
    };
    if (state.count) nextState.count = state.count; // preserve count value on client side navigation
    return nextState;
  } else {
    return reducers(state, action);
  }
};

export const store = () => {
  return createStore(reducer, bindMiddlware([thunkMiddleware]));
};

export const wrapper = createWrapper(store);

// import { createStore, applyMiddleware } from "redux";
// import { composeWithDevTools } from "redux-devtools-extension";
// import reducer from "./reducers/index";
// import thunk from "redux-thunk";

// export const store = createStore(
//   reducer,
//   composeWithDevTools(applyMiddleware(thunk))
// );
