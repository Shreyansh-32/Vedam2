import { prisma } from "@/lib/prisma";
import { stripe } from "@/lib/stripe";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req : NextRequest){
    try {
        const data = await req.json();
        const books = await prisma.product.findFirst({
            where:{
                id : data.id
            }
        });

        if(!books){
            return NextResponse.json({"message" : "Product not found"} , {status : 400});
        }

        const session = await stripe.checkout.sessions.create({
            ui_mode : "embedded",
            line_items:[{
                price_data:{
                    unit_amount : books.price * 100,
                    currency : "inr",
                    product_data:{
                        name : books.title,
                        images : [books.imageUrl]
                    },
                },
                quantity:data.quantity
            }],
            payment_method_types:["card"],
            mode:"payment",
            return_url : `${req.headers.get("referer")}/paymentResult?session_id={CHECKOUT_SESSION_ID}&bookId=${books.id}&quantity=${data.quantity}&addressId=${data.addressId}`
        });
        return NextResponse.json({id : session.id , client_secret:session.client_secret});
    } catch (error) {
        return NextResponse.json({"message" : "Something went wrong" , error} , {status : 500});
    }
}