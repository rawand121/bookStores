import nc from "next-connect";
import isAdmin from "../../../../Backend/middlewares/isAdmin";
import onError from "../../../../Backend/middlewares/createError";
import dbConfig from "../../../../Backend/config/dbConfig";
import { getUsers } from "../../../../Backend/controllers/admin";

const handler = nc({ onError });

dbConfig();

handler.use(isAdmin).get(getUsers);

export default handler;
