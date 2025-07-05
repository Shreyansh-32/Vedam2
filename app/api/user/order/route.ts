import { authCheck } from "@/lib/authCheck";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";



interface orderProps{
    productId : number,
    userId : number,
    quantity : number,
    addressId : number
}

export async function POST(req : NextRequest){
    const session = await authCheck();
    if(!session || !session.user || session.user.role !== "user"){
        return NextResponse.json({"message" : "Unauthorized"} , {status : 401});
    }
    const data = await req.json();

    const{productId , userId , quantity , addressId} : orderProps = data;

    try{
        const product = await prisma.product.findFirst({
            where : {
                id : productId
            }
        });

        if(product){
            if(product.quantity < quantity){
                return NextResponse.json({"message" : "Not enough quantity left"} , {status : 200});
            }

            else{
                await prisma.product.update({
                    where : {
                        id : productId
                    },
                    data:{
                        quantity : product.quantity - quantity
                    }
                });

                await prisma.order.create({
                    data:{
                        productId,
                        userId,
                        quantity,
                        addressId,
                        price : quantity * product.price
                    },
                });

                return NextResponse.json({"message" : "Order placed successfully"} , {status : 200});
            }
        }
    }
    catch(err){
        return NextResponse.json({"message" : "Internal server error" , error : err} , {status : 500});
    }
};

interface orderDeleteProps{
    id : number,
    productId : number,
    quantity : number
};

export async function DELETE(req : NextRequest){
    const session = await authCheck();
    if(!session || !session.user || session.user.role !== "user"){
        return NextResponse.json({"message" : "Unauthorized"} , {status : 401});
    }
    const data = await req.json();

    const {id , productId , quantity} : orderDeleteProps = data;

    try{
        await prisma.order.delete({
            where : {
                id
            }
        });

        await prisma.product.update({
            where:{
                id : productId
            },
            data : {
                quantity : {
                    increment : quantity
                }
            }
        });

        return NextResponse.json({"message" : "Order canceled successfully"} , {status:200});
    }
    catch(err){
        return NextResponse.json({"message" : "Internal server error" , error : err} , {status : 500});
    }
}

export async function GET(req : NextRequest){
    const session = await authCheck();
    if(!session || !session.user || session.user.role !== "user"){
        return NextResponse.json({"message" : "Unauthorized"} , {status : 401});
    }
    const data = await req.json();

    const userId : number = data.userId;

    try{
        const orders = await prisma.order.findMany({
            where:{
                userId
            }
        });

        return NextResponse.json({orders} , {status:200});
    }
    catch(err){
        return NextResponse.json({"message" : "Internal server error" , error : err} , {status : 500});
    }
}