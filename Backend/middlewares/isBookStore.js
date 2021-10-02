import { getSession } from "next-auth/client";
import ErrorHandler from "../utils/errorHandler";
import BookstoresModel from "../models/bookStore";

const isBookStore = async (req, res, next) => {
  try {
    const session = await getSession({ req });
    if (!session || (session && !session.user.address)) {
      return next(
        new ErrorHandler("ڕێگە پێدراو نیت سەردانی ئێرە بکەیت..", 401)
      );
    }
    // console.log(session.user);
    const user = await BookstoresModel.findById(session.user._id);
    req.user = user;
    next();
  } catch (err) {
    next(new ErrorHandler("Something went wrong, please try again", 500));
  }
};

export default isBookStore;
