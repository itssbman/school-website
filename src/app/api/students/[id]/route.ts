import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await getServerSession(authOptions);
  if (!session || !["teacher", "admin"].includes(session.user.role)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const student = await prisma.student.findUnique({
    where: { id },
    include: {
      user: true,
      grades: { orderBy: { createdAt: "desc" } },
      attendance: { orderBy: { date: "desc" }, take: 60 },
      feeRecords: { orderBy: { dueDate: "desc" } },
      submissions: true,
    },
  });

  if (!student) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(student);
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const body = await req.json();

  try {
    const updated = await prisma.student.update({
      where: { id },
      data: {
        ...(body.className ? { class: body.className } : {}),
        ...(body.admissionNumber ? { admissionNumber: body.admissionNumber } : {}),
        user: body.name || body.active !== undefined ? {
          update: {
            ...(body.name ? { name: body.name } : {}),
            ...(body.active !== undefined ? { active: body.active } : {}),
          },
        } : undefined,
      },
      include: { user: true },
    });
    return NextResponse.json(updated);
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  try {
    const student = await prisma.student.findUnique({ where: { id } });
    if (!student) return NextResponse.json({ error: "Not found" }, { status: 404 });
    await prisma.user.delete({ where: { id: student.userId } });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
