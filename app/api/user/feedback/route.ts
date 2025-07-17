import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const data = await req.json();
  const { feedback, userId, productId, rating } = data;
  try {
    await prisma.feedback.create({
      data: {
        feedback,
        rating,
        userId,
        productId,
      },
    });
    return NextResponse.json({"message" : "Feedback added successfully"} , {status : 200});
  } catch (error) {
    return NextResponse.json({"message" : "Internal server error" , error} , {status : 500});
  }
}
