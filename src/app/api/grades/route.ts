import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const studentId = searchParams.get("studentId");
  const term = searchParams.get("term");

  try {
    if (session.user.role === "student") {
      const student = await prisma.student.findUnique({ where: { userId: session.user.id } });
      if (!student) return NextResponse.json({ error: "Not found" }, { status: 404 });
      const grades = await prisma.grade.findMany({
        where: { studentId: student.id, ...(term ? { term } : {}) },
        orderBy: { createdAt: "desc" },
      });
      return NextResponse.json(grades);
    }

    if ((session.user.role === "teacher" || session.user.role === "admin") && studentId) {
      const grades = await prisma.grade.findMany({
        where: { studentId, ...(term ? { term } : {}) },
        orderBy: { createdAt: "desc" },
      });
      return NextResponse.json(grades);
    }

    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  } catch (error) {
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
    const { studentId, subject, score, term } = body;

    if (!studentId || !subject || score === undefined || !term) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const grade = await prisma.grade.create({
      data: { studentId, subject, score: parseFloat(score), term },
    });

    return NextResponse.json(grade, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
