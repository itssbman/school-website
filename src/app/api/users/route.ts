import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const query = searchParams.get("q");
  const role  = searchParams.get("role");

  const users = await prisma.user.findMany({
    where: {
      ...(role  ? { role: role as any }                                    : {}),
      ...(query ? { OR: [
        { name:  { contains: query, mode: "insensitive" } },
        { email: { contains: query, mode: "insensitive" } },
      ]} : {}),
    },
    select: {
      id: true, name: true, email: true, role: true,
      active: true, avatar: true, createdAt: true,
    },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(users);
}
