import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/options";
import { prisma } from "@/lib/prisma";


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
    const session = await getServerSession(authOptions);
    if(!session || !session.user || !session.user.id){
        return NextResponse.json({"message" : "Unauthorized"} , {status : 401});
    }
    if(session.user.role !== "seller"){
        return NextResponse.json({"message" : "Forbidden"} , {status : 403});
    }

   const data = await req.json();
    const { title, description, author, page, price, category, sellerId, quantity, imageUrl } : productCreateProps = data;

    try {
        const existing = await prisma.product.findFirst({
            where: { title, sellerId }
        });
        if (existing) {
            return NextResponse.json({ message: "Product already exists" }, { status: 409 });
        }

        await prisma.product.create({
            data: { title, description, author, page, price, category, sellerId, imageUrl, quantity }
        });

        return NextResponse.json({ message: "Product added successfully" }, { status: 200 });
    } catch (err) {
        return NextResponse.json({ message: "Internal server error", error: err }, { status: 500 });
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

export async function PUT(req : NextRequest){
    const session = await getServerSession(authOptions);
    if(!session || !session.user || !session.user.id){
        return NextResponse.json({"message" : "Unauthorized"} , {status : 401});
    }
    if(session.user.role !== "seller"){
        return NextResponse.json({"message" : "Forbidden"} , {status : 403});
    }
    const data = await req.json();
    const { title, description, author, page, price, category, quantity, imageUrl, id } = data;
    console.log(title,description,author,page,price,category,quantity,imageUrl,id);
    try {
        const product = await prisma.product.findUnique({ where: { id } });

        if (product) {
            await prisma.product.update({
                where: { id },
                data: { title, description, author, page, price, category, quantity, imageUrl }
            });

            return NextResponse.json({ message: "Product updated successfully" }, { status: 200 });
        } else {
            return NextResponse.json({ message: "Product not found" }, { status: 404 });
        }
    } catch (err) {
        return NextResponse.json({ message: "Internal server error", error: err }, { status: 500 });
    }
}