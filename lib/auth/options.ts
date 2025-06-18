import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from "@/app/generated/prisma";
import { NextAuthOptions } from "next-auth";
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

      async authorize(credentials, req) {
          if(!credentials?.email || !credentials.password){
            throw new Error("Missing email or password");
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
                throw new Error("User with given email doesn't exist");
              }

              const isValid = await bcrypt.compare(credentials.password , user.password);

              if(!isValid){
                throw new Error("Invalid password");
              }

              return{
                id : user.id,
                email : user.email,
                role : "user"
              };
            }
            if(role === "seller"){
              const seller = await prisma.seller.findUnique({
                where : {
                  email : credentials.email
                }
              });

              if(!seller){
                throw new Error("Seller with given email doesn't exist");
              }

              const isValid = await bcrypt.compare(credentials.password , seller.password);

              if(!isValid){
                throw new Error("Invalid password");
              }

              return{
                id : seller.id,
                email : seller.email,
                role : "seller"
              };
            }
          }
          catch(err){
            console.error("Auth error: "+err);
            throw err;
          }
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