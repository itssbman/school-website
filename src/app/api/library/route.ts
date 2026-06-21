import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const query    = searchParams.get("q");
  const category = searchParams.get("category");

  const books = await prisma.libraryBook.findMany({
    where: {
      ...(category ? { category }                                             : {}),
      ...(query    ? { OR: [
        { title:  { contains: query, mode: "insensitive" } },
        { author: { contains: query, mode: "insensitive" } },
      ]} : {}),
    },
    orderBy: { title: "asc" },
  });

  return NextResponse.json(books);
}
