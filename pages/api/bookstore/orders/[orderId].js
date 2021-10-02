import nc from "next-connect";
import isBookStore from "../../../../Backend/middlewares/isBookStore";
import onError from "../../../../Backend/middlewares/createError";
import dbConfig from "../../../../Backend/config/dbConfig";
import { deleteOrder } from "../../../../Backend/controllers/orders";

const handler = nc({ onError });

dbConfig();

handler.use(isBookStore).delete(deleteOrder);

export default handler;
