import Credentials from "next-auth/providers/credentials";
import { AppProviders } from "./../node_modules/next-auth/src/providers/index";
import { NextAuthOptions } from "next-auth";
import { email, success } from "zod";
import { failedLogin, successLogin } from "./app/types/authInterface";
import { use } from "react";

export const AuthOptions: NextAuthOptions = {
  pages: {
    signIn: "/Login",
  },
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        //call api
        const response = await fetch(`${process.env.API}/auth/signin`, {
          method: "POST",
          body: JSON.stringify({
            email: credentials?.email,
            password: credentials?.password,
          }),
          headers: {
            "Content-type": "application/json",
          },
        });
        const payload: failedLogin | successLogin = await response.json();
        console.log(payload);
        if ("token" in payload) {
          return {
            id: payload.user.email,
            user: payload.user,
            token: payload.token,
          };
        } else {
          throw new Error("error.............");
        }
      },
    }),
  ],
  callbacks: {
    jwt: ({ token, user }) => {
      if (user) {
        token.user = user.user;
        token.token = user.token;
      }
      return token;
    },
    session: ({ session, token }) => {
      session.user = token.user;
      return session;
    },
  },
};
