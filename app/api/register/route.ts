import { NextRequest, NextResponse } from "next/server";
import { userSchema } from "@/lib/zodSchema";
import bcrypt from "bcrypt";
import { prisma } from "@/lib/prisma";


interface signupProp{
    email : string,
    password : string,
    firstname : string,
    lastname : string,
    phone : number,
    role : string
};

export async function POST(req : NextRequest){
    const data = await req.json();

    const {email , password , firstname , lastname , phone , role} : signupProp = data;

    try{
        const res = await userSchema.safeParse({email , password , firstname , lastname , phone});

        if(res.success){
            if(role === "user"){
                const user = await prisma.user.findFirst({
                    where : {
                        email
                    }
                });

                if(user){
                    return NextResponse.json({"message" : "User with given email already exist"} , {status : 400});
                }
                else{
                    const hashedPassword = await bcrypt.hash(password , 10);
                    await prisma.user.create({
                        data : {
                            email,
                            password : hashedPassword,
                            firstname,
                            lastname,
                            phone
                        }
                    });

                    return NextResponse.json({"message" : "User signed up successfully"} , {status : 200});
                }
            }
            else{
                const seller = await prisma.seller.findFirst({
                    where : {
                        email
                    }
                });

                if(seller){
                    return NextResponse.json({"message" : "Seller with given email exist"} , {status : 400});
                }
                else{
                    const hashedPassword = await bcrypt.hash(password , 10);

                    await prisma.seller.create({
                        data : {
                            email,
                            password : hashedPassword,
                            firstname,
                            lastname,
                            phone
                        }
                    });

                    return NextResponse.json({"message" : "Seller signed up successfully"} , {status : 200});
                }
            }
        }
        else{
            return NextResponse.json({"message"  : "Invalid input format" , res} , {status : 411});
        }
    }
    catch(err){
        return NextResponse.json({"message" : "Internal server error" , error : err} , {status : 500});
    }
}