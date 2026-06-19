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
      const assignments = await prisma.assignment.findMany({
        where: { classId: student.class },
        orderBy: { dueDate: "asc" },
        include: {
          submissions: { where: { studentId: student.id } },
          teacher: { include: { user: { select: { name: true } } } },
        },
      });
      return NextResponse.json(assignments);
    }

    if (session.user.role === "teacher") {
      const teacher = await prisma.teacher.findUnique({ where: { userId: session.user.id } });
      if (!teacher) return NextResponse.json([], { status: 200 });
      const assignments = await prisma.assignment.findMany({
        where: { teacherId: teacher.id },
        orderBy: { createdAt: "desc" },
        include: { submissions: true },
      });
      return NextResponse.json(assignments);
    }

    if (session.user.role === "admin") {
      const assignments = await prisma.assignment.findMany({
        orderBy: { createdAt: "desc" },
        include: {
          submissions: true,
          teacher: { include: { user: { select: { name: true } } } },
        },
      });
      return NextResponse.json(assignments);
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
    const { title, description, dueDate, classId } = body;

    if (!title || !dueDate || !classId) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    let teacherId: string;
    if (session.user.role === "teacher") {
      const teacher = await prisma.teacher.findUnique({ where: { userId: session.user.id } });
      if (!teacher) return NextResponse.json({ error: "Teacher not found" }, { status: 404 });
      teacherId = teacher.id;
    } else {
      const firstTeacher = await prisma.teacher.findFirst();
      if (!firstTeacher) return NextResponse.json({ error: "No teachers found" }, { status: 404 });
      teacherId = firstTeacher.id;
    }

    const assignment = await prisma.assignment.create({
      data: {
        title,
        description: description || "",
        dueDate: new Date(dueDate),
        classId,
        teacherId,
      },
    });

    return NextResponse.json(assignment, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
