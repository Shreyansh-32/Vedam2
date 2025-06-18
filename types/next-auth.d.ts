import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: number;
      email: string;
      role : "user" | "seller";
      name?: string | null;
      image?: string | null;
    }&DefaultSession['user'];
  }

  interface User {
    id: number;
    email: string;
    role : "user" | "seller";
  }
}
