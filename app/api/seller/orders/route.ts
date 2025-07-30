import { authOptions } from "@/lib/auth/options";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "seller") {
    return NextResponse.json({ message: "Unauthorized" }, { status: 400 });
  }
  
  const {searchParams} = new URL(req.url);
  const sellerId = Number(searchParams.get("sellerId"));
  const page = Number(searchParams.get("page")) || 1;

  try {
    const product = await prisma.product.findMany({
            where : {
                sellerId
            }
        });
    
        const productIds = product.map((prod) => prod.id);
    
        if(productIds.length === 0){
            return NextResponse.json({"message" : "Seller has no products"} , {status : 404});
        }
    
        const orders = await prisma.order.findMany({
            where:{
                productId:{
                    in : productIds
                }
            },
            skip:(page-1)*5,
            take:5,
            include:{
                address:true,
                product:true
            }
        });

        return NextResponse.json({orders} , {status : 200});
  } catch (err) {
    return NextResponse.json(
      { message: "Internal server error", error: err },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "seller") {
    return NextResponse.json({ message: "Unauthorized" }, { status: 400 });
  }
  const {searchParams} = new URL(req.url);
  const id = Number(searchParams.get("id")) || null;
  const status = searchParams.get("status") || null;
  console.log("id" , id , "status" , status)
  if(!id || !status){
    return NextResponse.json({"message" : "Id or status missing"} , {status : 404});
  }
  try {
        const orders = await prisma.order.update({
            where:{
                id
            },
            data:{
                status
            },
            select:{
                product : true,
                address : true
            }
        });

        return NextResponse.json({"message" : "Order updated successfully",orders} , {status : 200});
  } catch (err) {
    return NextResponse.json(
      { message: "Internal server error", error: err },
      { status: 500 }
    );
  }
}
