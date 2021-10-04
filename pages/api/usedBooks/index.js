import nc from "next-connect";
import {
  addUsedBook,
  getUsedBooks,
} from "../../../Backend/controllers/usedBooks";
import isAuth from "../../../Backend/middlewares/isAuth";
 import onError from "../../../Backend/middlewares/createError";
const handler = nc({ onError });

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "5mb",
    },
  },
};

handler.get(getUsedBooks);

handler.use(isAuth).post(addUsedBook);

export default handler;
