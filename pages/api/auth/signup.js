import nc from "next-connect";
import dbConfig from "../../../Backend/config/dbConfig";
import { signupUser } from "../../../Backend/controllers/auth";
import onError from "../../../Backend/middlewares/createError";
const handler = nc({ onError });

dbConfig();

handler.post(signupUser);

export default handler;
