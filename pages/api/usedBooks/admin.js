import nc from "next-connect";
import { getUsedBooksAdmin } from "../../../Backend/controllers/usedBooks";
import isAdmin from "../../../Backend/middlewares/isAdmin";
import onError from "../../../Backend/middlewares/createError";
const handler = nc({ onError });

handler.use(isAdmin).get(getUsedBooksAdmin);

export default handler;
