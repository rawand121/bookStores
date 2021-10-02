import nc from "next-connect";
import isBookStore from "../../../Backend/middlewares/isBookStore";
import onError from "../../../Backend/middlewares/createError";
import dbConfig from "../../../Backend/config/dbConfig";
import { updatedDelivered } from "../../../Backend/controllers/bookStore";

const handler = nc({ onError });

dbConfig();

handler.use(isBookStore).patch(updatedDelivered);

export default handler;
