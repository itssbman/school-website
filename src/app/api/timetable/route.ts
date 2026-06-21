import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const classId = searchParams.get("class");

  let cls = classId;

  if (!cls && session.user.role === "student") {
    const student = await prisma.student.findUnique({ where: { userId: session.user.id } });
    cls = student?.class ?? null;
  }

  if (!cls && session.user.role === "teacher") {
    const teacher = await prisma.teacher.findUnique({ where: { userId: session.user.id } });
    cls = teacher?.classes[0] ?? null;
  }

  const timetable = await prisma.timetable.findMany({
    where: cls ? { class: cls } : {},
    orderBy: [{ day: "asc" }, { period: "asc" }],
  });

  return NextResponse.json(timetable);
}
