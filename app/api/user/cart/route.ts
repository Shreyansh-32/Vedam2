import { authCheck } from "@/lib/authCheck";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req : NextRequest){
   const session = await authCheck();
   if(!session || !session.user || session.user.role !== "user"){
    return NextResponse.json({"message" : "Unauthorized"} , {status : 401});
   }
   const data = await req.json();

   const productId : number = data.productId;
   const quantity : number = data.quantity;
   const userId : number = session.user.id;

   try{
    const cart = await prisma.cart.findFirst({
    where : {
        userId,
        productId
    }
   });

   if(cart){
    if(cart.quantity + quantity <= 0){
        await prisma.cart.delete({
            where : {
                id : cart.id
            }
        });

        return NextResponse.json({"message" : "Product deleted from cart successfully"} , {status : 200});
    }

    else{
        await prisma.cart.update({
            where:{
                id : cart.id
            },
            data : {
                quantity : cart.quantity + quantity
            }
        });

        return NextResponse.json({"message" : "Cart updated successfully"} , {status : 200});
    }
   }
   else{
    await prisma.cart.create({
        data : {
            userId,
            productId,
            quantity
        }
    });

    return NextResponse.json({"message" : "Product added to the cart successfully"} , {status : 200});
   }
   }
   catch(err){
    return NextResponse.json({"message" : "Internal server error" , error : err} , {status : 500})
   }
   return;
};

export async function GET(req : NextRequest){
    const session = await authCheck();
   if(!session || !session.user || session.user.role !== "user"){
    return NextResponse.json({"message" : "Unauthorized"} , {status : 401});
   }
    const data = await req.json();

    const userId : number = data.userId;

    try{
        const cart = await prisma.cart.findMany({
            where:{
                userId
            }
        });

        return NextResponse.json({cart} , {status:200});
    }
    catch(err){
        return NextResponse.json({"message" : "Internal server error" , error : err} , {status : 500});
    }
}

export async function DELETE(req : NextRequest){
    const session = await authCheck();
   if(!session || !session.user || session.user.role !== "user"){
    return NextResponse.json({"message" : "Unauthorized"} , {status : 401});
   }
    const data = await req.json();

    const productId : number = data.productId;

    try {
        await prisma.cart.deleteMany({
            where:{
                productId
            }
        });
        return NextResponse.json({"message" : "Product removed from cart successfully"} , {status : 200});
    } catch (error) {
        return NextResponse.json({"message" : "Internal server error" , error} , {status : 500});
    }
}