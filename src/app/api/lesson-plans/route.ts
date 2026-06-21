import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session || !["teacher", "admin"].includes(session.user.role)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const where = session.user.role === "teacher"
      ? { teacher: { userId: session.user.id } }
      : {};

    const plans = await prisma.lessonPlan.findMany({
      where,
      orderBy: { uploadedAt: "desc" },
    });

    return NextResponse.json(plans);
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
    const { subject, class: cls, week, fileUrl } = await req.json();

    if (!subject || !cls || !week || !fileUrl) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const teacher = await prisma.teacher.findUnique({ where: { userId: session.user.id } });
    if (!teacher) return NextResponse.json({ error: "Teacher not found" }, { status: 404 });

    const plan = await prisma.lessonPlan.create({
      data: { subject, class: cls, week, fileUrl, teacherId: teacher.id },
    });

    return NextResponse.json(plan, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
