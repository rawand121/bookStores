import nc from "next-connect";
import isAdmin from "../../../Backend/middlewares/isAdmin";
import onError from "../../../Backend/middlewares/createError";
import dbConfig from "../../../Backend/config/dbConfig";
import { dashboard } from "../../../Backend/controllers/admin";

const handler = nc({ onError });

dbConfig();

handler.use(isAdmin).get(dashboard);

export default handler;
