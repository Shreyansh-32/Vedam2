import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from "@/app/generated/prisma";
import { NextAuthOptions, User } from "next-auth";
import bcrypt from "bcrypt";


const prisma = new PrismaClient();

export const authOptions : NextAuthOptions = {
  providers : [
    CredentialsProvider({

      name : "Credentials",

      credentials:{
        email : {label : "email" , placeholder : "Email" },
        password : {label : "password" , placeholder : "Password"},
      },

      async authorize(credentials, req) : Promise<User | null> {
          if(!credentials?.email || !credentials.password){
            return null;
          }
          try{
            const role = req.body?.role;

            if(role === "user"){
              const user = await prisma.user.findUnique({
                where : {
                  email : credentials.email
                }
              });

              if(!user){
                return null;
              }

              const isValid = await bcrypt.compare(credentials.password , user.password);

              if(!isValid){
                return null;
              }

              return{
                id : user.id,
                email : user.email,
                role : "user"
              } as User;
            }
            if(role === "seller"){
              const seller = await prisma.seller.findUnique({
                where : {
                  email : credentials.email
                }
              });

              if(!seller){
                return null;
              }

              const isValid = await bcrypt.compare(credentials.password , seller.password);

              if(!isValid){
                return null;
              }

              return{
                id : seller.id,
                email : seller.email,
                role : "seller"
              } as User;
            }
          }
          catch(err){
            console.error("Auth error: "+err);
            return null;
          }
          return null;
      },
    })
  ],

  callbacks:{
    async jwt({user , token}){
      if(user){
        token.id = user.id;
        token.role = user.role;
      }

      return token;
    },

    async session({session , token}){
      if(session.user){
        session.user.id = token.id as number;
        session.user.role = token.role as "user" | "seller";
      }

      return session;
    }
  },

  pages : {
        signIn : "/signin",
        error : "/error"
  },

  session:{
    strategy : "jwt",
    maxAge : 30 * 24 * 60 * 60
  },

  secret:process.env.NEXTAUTH_SECRET

};