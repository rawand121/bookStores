import nc from "next-connect";
import { updatePassword } from "../../Backend/controllers/auth";
import isAuth from "../../Backend/middlewares/isAuth";
import onError from "../../Backend/middlewares/createError";
const handler = nc({ onError });

handler.use(isAuth).post(updatePassword);

export default handler;
