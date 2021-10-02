import { getSession } from "next-auth/client";
import ErrorHandler from "../utils/errorHandler";

const isAdmin = async (req, res, next) => {
  try {
    const session = await getSession({ req });
    if (!session || !session.user.isAdmin) {
      return next(
        new ErrorHandler("You Are Not Authorize for this route", 404)
      );
    } else {
      next();
    }
  } catch (err) {
    next(new ErrorHandler(err.message, 500));
  }
};

export default isAdmin;
