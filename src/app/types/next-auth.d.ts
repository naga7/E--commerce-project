import NextAuth, { User } from "next-auth";
import { UserReasponse } from "./authInterface";

import { JWT } from "next-auth/jwt";
declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface User {
    user: UserReasponse;
    token: string;
  }
  interface Session {
    user: UserReasponse;
  }
}
declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT extends User {
    /** OpenID ID Token */
    idToken?: string;
  }
}
