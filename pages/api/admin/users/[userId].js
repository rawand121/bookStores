import nc from "next-connect";
import isAdmin from "../../../../Backend/middlewares/isAdmin";
import onError from "../../../../Backend/middlewares/createError";
import dbConfig from "../../../../Backend/config/dbConfig";
import { deleteUser } from "../../../../Backend/controllers/admin";

const handler = nc({ onError });

dbConfig();

handler.use(isAdmin).delete(deleteUser);

export default handler;
