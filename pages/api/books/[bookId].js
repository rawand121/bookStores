import nc from "next-connect";
import dbConfig from "../../../Backend/config/dbConfig";
import { getABook } from "../../../Backend/controllers/books";
import onError from "../../../Backend/middlewares/createError";

const handler = nc({ onError });

dbConfig();

handler.get(getABook);

export default handler;
