import nc from "next-connect";
import {
  approveBook,
  deleteBook,
  getBook,
} from "../../../Backend/controllers/usedBooks";
import isAdmin from "../../../Backend/middlewares/isAdmin";
import onError from "../../../Backend/middlewares/createError";
const handler = nc({ onError });

handler.get(getBook);

handler.use(isAdmin).delete(deleteBook);

handler.use(isAdmin).patch(approveBook);

export default handler;
