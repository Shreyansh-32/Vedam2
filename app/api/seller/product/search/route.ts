import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req : NextRequest){
    const data = await req.json();

    const search : string = data.search;

    try{
        const products = await prisma.product.findMany({
            where:{
                OR:[
                    {
                        title: {contains : search , mode: 'insensitive'}
                    },
                    {
                        description : {contains : search , mode: 'insensitive'}
                    },
                    {
                        author : {contains : search , mode: 'insensitive'}
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