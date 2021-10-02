import nc from "next-connect";
import { getLatest } from "../../Backend/controllers/books";
import onError from "../../Backend/middlewares/createError";
const handler = nc({ onError });

handler.get(getLatest);

export default handler;
