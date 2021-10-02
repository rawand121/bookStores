import nc from "next-connect";
import dbConfig from "../../../Backend/config/dbConfig";
import { selectUser } from "../../../Backend/controllers/auth";
import isAuth from "../../../Backend/middlewares/isAuth";
import onError from "../../../Backend/middlewares/createError";
const handler = nc({ onError });

dbConfig();

handler.use(isAuth).get(selectUser);

export default handler;
