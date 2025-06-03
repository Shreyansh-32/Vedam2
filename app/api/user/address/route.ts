import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@/app/generated/prisma";

const prisma = new PrismaClient();

interface addressProps{
    houseNo : string,
    street : string,
    area : string,
    city : string,
    state : string,
    pincode : number,
    userId : number
}

export async function POST(req : NextRequest){
    const data = await req.json();

    const {houseNo , street , area , city , state , pincode , userId} : addressProps = data;

    try{
        const address = await prisma.address.findFirst({
            where : {
                houseNo,
                street,
                area,
                city,
                state,
                pincode,
                userId
            }
        });


        if(address){
            return NextResponse.json({"message" : "Address already exist"} , {status : 200});
        }

        else{
            await prisma.address.create({
                data : {
                    houseNo,
                    street,
                    area,
                    city,
                    state,
                    pincode,
                    userId
                }
            });

            return NextResponse.json({"message" : "Address added successfully"} , {status : 200});
        }
    }
    catch(err){
        return NextResponse.json({"message" : "Internal server error" , error : err} , {status : 500});
    }
}

export async function GET(req : NextRequest){
    const data = await req.json();

    const userId : number = data.userId;

    try{
        const address = await prisma.address.findMany({
            where : {
                userId
            }
        });

        return NextResponse.json({address} , {status:200});
    }
    catch(err){
        return NextResponse.json({"message" : "Internal server error" , error : err} , {status : 500});
    }
}