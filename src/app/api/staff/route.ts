import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(_req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const teachers = await prisma.teacher.findMany({
    include: {
      user: { select: { id: true, name: true, email: true, avatar: true, active: true, createdAt: true } },
    },
    orderBy: { user: { name: "asc" } },
  });

  return NextResponse.json(teachers);
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { name, email, password, subjects, classes } = await req.json();
    if (!name || !email || !password) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const bcrypt = await import("bcryptjs");
    const hashed = await bcrypt.default.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashed,
        role: "teacher",
        teacher: {
          create: {
            subjects: subjects ?? [],
            classes: classes ?? [],
          },
        },
      },
      include: { teacher: true },
    });

    return NextResponse.json(user, { status: 201 });
  } catch (err: any) {
    if (err?.code === "P2002") {
      return NextResponse.json({ error: "Email already exists" }, { status: 409 });
    }
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
