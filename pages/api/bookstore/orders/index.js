import nc from "next-connect";
import isBookStore from "../../../../Backend/middlewares/isBookStore";
import onError from "../../../../Backend/middlewares/createError";
import dbConfig from "../../../../Backend/config/dbConfig";
import { getMyOrders } from "../../../../Backend/controllers/orders";

const handler = nc({ onError });

dbConfig();

handler.use(isBookStore).get(getMyOrders);

export default handler;
