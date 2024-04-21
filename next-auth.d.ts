import { DefaultSession, DefaultUser } from "next-auth";
import { JWT, DefaultJWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      role: string;
      name: string;
      label: string;
      group: string;
    } & DefaultSession["user"];
  }

  export interface User extends DefaultUser {
    role: string;
    label: string;
    group: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    role: string;
    label: string;
    group: string;
  }
}
