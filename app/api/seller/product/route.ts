import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@/app/generated/prisma";

const prisma = new PrismaClient();

interface productCreateProps{
    title : string,
    description : string,
    author : string,
    page : number,
    price : number,
    category : string,
    sellerId : number,
    quantity : number,
    imageUrl : string
}

export async function POST(req : NextRequest){
    const data = await req.json();

    const{title , description , author , page , price, category , sellerId , quantity , imageUrl} : productCreateProps = data;

    try{
        const product = await prisma.product.findFirst({
            where:{
                title,
                description,
                author,
                page,
                price,
                sellerId,
                category
            }
        });

        if(product){
            await prisma.product.update({
                where : {
                    id : product.id
                },
                data : {
                    quantity : {
                        increment : quantity
                    }
                }
            });

            return NextResponse.json({"message" : "Product added successfully"} , {status : 200});
        }

        else{
            await prisma.product.create({
                data : {
                    title,
                    description,
                    author,
                    page,
                    price,
                    category,
                    sellerId,
                    imageUrl,
                    quantity
                }
            });

            return NextResponse.json({"message" : "Product added successfully"} , {status : 200});
        }
    }
    catch(err){
        return NextResponse.json({"message" : "Internal server error" , error : err} , {status : 500});
    }
}

export async function DELETE(req : NextRequest){
    const data = await req.json();

    const id : number = data.id;

    try{
        await prisma.product.delete({
            where:{
                id
            }
        });

        return NextResponse.json({"message" : "Product deleted successfully"} , {status : 200});
    }
    catch(err){
        return NextResponse.json({"message" : "Internal server error" , error : err} , {status : 500});
    }
}

export async function GET(){
    try{
        const products = await prisma.product.findMany();
        return NextResponse.json({products} , {status:200});
    }
    catch(err){
        return NextResponse.json({"message" : "Internal server error" , error : err} , {status : 500});
    }
}