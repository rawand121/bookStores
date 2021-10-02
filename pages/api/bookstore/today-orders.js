import nc from "next-connect";
import isBookStore from "../../../Backend/middlewares/isBookStore";
import onError from "../../../Backend/middlewares/createError";
import dbConfig from "../../../Backend/config/dbConfig";
import { todayOrders } from "../../../Backend/controllers/bookStore";

const handler = nc({ onError });

dbConfig();

handler.use(isBookStore).get(todayOrders);

export default handler;
