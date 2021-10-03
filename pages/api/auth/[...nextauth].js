import NextAuth from "next-auth";
import Providers from "next-auth/providers";

import User from "../../../Backend/models/user";
import BookStoreModel from "../../../Backend/models/bookStore";
import dbConnection from "../../../Backend/config/dbConfig";
import bcrypt from "bcrypt";
import cors from "cors";

export default NextAuth({
  session: {
    jwt: true,
  },
  providers: [
    Providers.Credentials({
      async authorize(credentials) {
        dbConnection();

        const { email, password } = credentials;

        if (!email || !password) {
          throw new Error("Please Type Email and Password.");
        }

        let endpoint = await User.findOne({ email }).select("+password");

        if (
          credentials.callbackUrl ===
            "https://book-stores.vercel.app/signin-store" ||
          credentials.callbackUrl ===
            "https://book-stores.vercel.app/Arabic/signin-store" ||
          credentials.callbackUrl ===
            "https://book-stores.vercel.app/Kurdish/signin-store"
        ) {
          endpoint = await BookStoreModel.findOne({ email });
        }

        const user = endpoint;

        if (!user) {
          throw new Error("User Not Found Please Try again..");
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
          throw new Error("Wrong Password, Please Try diffrent one..");
        }
        return Promise.resolve(user);
      },
    }),
  ],
  callbacks: {
    jwt: async (token, user) => {
      user && (token.user = user);
      return Promise.resolve(token);
    },
    session: async (session, token) => {
      session.user = token.user;
      return Promise.resolve(session);
    },
  },
});
