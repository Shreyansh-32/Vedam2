import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";


export async function GET(req : NextRequest){
    const data = await req.json();

    const category : string = data.category;

    try{
        const products = await prisma.product.findMany({
            where : {
                category
            }
        });

        return NextResponse.json({products} , {status:200});
    }
    catch(err){
        return NextResponse.json({"message" : "Internal server error" , error : err} , {status : 500});
    }
}