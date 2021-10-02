import nc from "next-connect";
import dbConfig from "../../../Backend/config/dbConfig";
import { relatedBooks } from "../../../Backend/controllers/books";
import onError from "../../../Backend/middlewares/createError";
const handler = nc({ onError });

dbConfig();

handler.get(relatedBooks);

export default handler;
