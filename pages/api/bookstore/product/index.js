import nc from "next-connect";
import isBookStore from "../../../../Backend/middlewares/isBookStore";
import onError from "../../../../Backend/middlewares/createError";
import dbConfig from "../../../../Backend/config/dbConfig";
import { createProd } from "../../../../Backend/controllers/bookStore";

const handler = nc({ onError });

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "5mb",
    },
  },
};

dbConfig();

handler.use(isBookStore).post(createProd);

export default handler;
