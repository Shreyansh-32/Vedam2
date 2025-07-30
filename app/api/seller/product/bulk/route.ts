import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/options";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "seller") {
    return NextResponse.json({ message: "Unauthorized" }, { status: 400 });
  }
  const { searchParams } = new URL(req.url);
  const sellerId = Number(searchParams.get("sellerId"));
  const page = Number(searchParams.get("page")) || 1;
  const search = searchParams.get("search") || "";
  try {
    const products = await prisma.product.findMany({
      where: {
        sellerId,
        ...(search && {
          OR: [
            { title: { contains: search, mode: "insensitive" } },
            { author: { contains: search, mode: "insensitive" } },
          ],
        }),
      },
      skip: (page - 1) * 5,
      take: 5,
    });
    return NextResponse.json({ products }, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      { message: "Internal server error", error: err },
      { status: 500 }
    );
  }
}
