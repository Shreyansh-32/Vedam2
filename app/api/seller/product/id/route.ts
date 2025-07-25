import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req : NextRequest){
    const data = await req.json();

    const id : number = data.id;

    try{
        const product = await prisma.product.findFirst({
            where : {
                id
            }
        });

        return NextResponse.json({product} , {status : 200});
    }
    catch(err){
        return NextResponse.json({"message" : "Internal server error" , error : err} , {status : 500});
    }
}