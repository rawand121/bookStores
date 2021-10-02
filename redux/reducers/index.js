import { combineReducers } from "redux";
import Auth from "./auth";
import Books from "./books";
import Orders from "./orders";
import Latest from "./latest";
import Signup from "./signup";
import UsedBooks from "./UsedBooks";

const rootReducer = combineReducers({
  Auth,
  Books,
  Orders,
  Latest,
  Signup,
  UsedBooks,
});

export default rootReducer;
