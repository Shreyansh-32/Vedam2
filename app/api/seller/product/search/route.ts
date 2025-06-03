import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@/app/generated/prisma";

const prisma = new PrismaClient();

export async function GET(req : NextRequest){
    const data = await req.json();

    const search : string = data.search;

    try{
        const products = await prisma.product.findMany({
            where:{
                OR:[
                    {
                        title: {contains : search}
                    },
                    {
                        description : {contains : search}
                    },
                    {
                        author : {contains : search}
                    }
                ]
            }
        });

        return NextResponse.json({products} , {status : 200});
    }
    catch(err){
        return NextResponse.json({"message" : "Internal server error" , error : err} , {status : 500});
    }
}