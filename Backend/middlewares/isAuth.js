import { getSession } from "next-auth/client";
import ErrorHandler from "../utils/errorHandler";

const isAuth = async (req, res, next) => {
  try {
    const session = await getSession({ req });
    if (!session) {
      return next(new ErrorHandler("Please Login First", 400));
    }
    req.user = session.user;
    next();
  } catch (err) {
    next(new ErrorHandler("Something went wrong, please try again", 500));
  }
};

export default isAuth;
