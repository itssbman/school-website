import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const studentId = searchParams.get("studentId");

  try {
    if (session.user.role === "student") {
      const student = await prisma.student.findUnique({ where: { userId: session.user.id } });
      if (!student) return NextResponse.json({ error: "Not found" }, { status: 404 });
      const records = await prisma.attendance.findMany({
        where: { studentId: student.id },
        orderBy: { date: "desc" },
        take: 90,
      });
      return NextResponse.json(records);
    }

    if (studentId && ["teacher", "admin", "parent"].includes(session.user.role)) {
      const records = await prisma.attendance.findMany({
        where: { studentId },
        orderBy: { date: "desc" },
      });
      return NextResponse.json(records);
    }

    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session || !["teacher", "admin"].includes(session.user.role)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { date, records } = body;

    if (!date || !Array.isArray(records)) {
      return NextResponse.json({ error: "Invalid data" }, { status: 400 });
    }

    const results = await prisma.$transaction(
      records.map(({ studentId, status }: { studentId: string; status: string }) =>
        prisma.attendance.upsert({
          where: { studentId_date: { studentId, date: new Date(date) } },
          update: { status: status as any },
          create: { studentId, date: new Date(date), status: status as any },
        })
      )
    );

    return NextResponse.json(results, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
