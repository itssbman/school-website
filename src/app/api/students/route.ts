import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session || !["teacher", "admin"].includes(session.user.role)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const classId = searchParams.get("class");
  const query   = searchParams.get("q");

  const students = await prisma.student.findMany({
    where: {
      ...(classId ? { class: classId } : {}),
      ...(query
        ? { user: { name: { contains: query, mode: "insensitive" } } }
        : {}),
    },
    include: {
      user: { select: { id: true, name: true, email: true, avatar: true, active: true, createdAt: true } },
      feeRecords: { orderBy: { dueDate: "desc" }, take: 1 },
      _count: { select: { attendance: true } },
    },
    orderBy: { user: { name: "asc" } },
  });

  return NextResponse.json(students);
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { name, email, password, className, admissionNumber, parentId } = await req.json();
    if (!name || !email || !password || !className || !admissionNumber) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const bcrypt = await import("bcryptjs");
    const hashed = await bcrypt.default.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashed,
        role: "student",
        student: {
          create: {
            class: className,
            admissionNumber,
            ...(parentId ? { parentId } : {}),
          },
        },
      },
      include: { student: true },
    });

    return NextResponse.json(user, { status: 201 });
  } catch (err: any) {
    if (err?.code === "P2002") {
      return NextResponse.json({ error: "Email or admission number already exists" }, { status: 409 });
    }
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
