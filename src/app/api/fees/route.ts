import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    if (session.user.role === "student") {
      const student = await prisma.student.findUnique({ where: { userId: session.user.id } });
      if (!student) return NextResponse.json([], { status: 200 });
      const fees = await prisma.feeRecord.findMany({
        where: { studentId: student.id },
        orderBy: { dueDate: "desc" },
      });
      return NextResponse.json(fees);
    }

    if (session.user.role === "parent") {
      const parent = await prisma.parent.findUnique({
        where: { userId: session.user.id },
        include: { children: true },
      });
      if (!parent) return NextResponse.json([], { status: 200 });
      const fees = await prisma.feeRecord.findMany({
        where: { studentId: { in: (parent.children as any[]).map((c: any) => c.id) } },
        orderBy: { dueDate: "desc" },
      });
      return NextResponse.json(fees);
    }

    if (session.user.role === "admin") {
      const fees = await prisma.feeRecord.findMany({
        orderBy: { dueDate: "desc" },
        include: { student: { include: { user: { select: { name: true } } } } },
      });
      return NextResponse.json(fees);
    }

    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
