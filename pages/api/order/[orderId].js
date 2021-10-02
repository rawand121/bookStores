import nc from "next-connect";
import dbConfig from "../../../Backend/config/dbConfig";
import { getOneOrder } from "../../../Backend/controllers/orders";
import onError from "../../../Backend/middlewares/createError";
import isAuth from "../../../Backend/middlewares/isAuth";

const handler = nc({ onError });

dbConfig();

handler.use(isAuth).get(getOneOrder);

export default handler;
