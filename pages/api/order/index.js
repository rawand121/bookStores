import nc from "next-connect";
import dbConfig from "../../../Backend/config/dbConfig";
import { setOrder, getOrders } from "../../../Backend/controllers/orders";
import onError from "../../../Backend/middlewares/createError";
import isAuth from "../../../Backend/middlewares/isAuth";
const handler = nc({ onError });

dbConfig();

handler.use(isAuth).post(setOrder);

handler.use(isAuth).get(getOrders);

export default handler;
