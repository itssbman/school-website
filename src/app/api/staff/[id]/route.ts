import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const body = await req.json();

  try {
    const updated = await prisma.teacher.update({
      where: { id },
      data: {
        ...(body.subjects ? { subjects: body.subjects } : {}),
        ...(body.classes  ? { classes: body.classes }   : {}),
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
    const teacher = await prisma.teacher.findUnique({ where: { id } });
    if (!teacher) return NextResponse.json({ error: "Not found" }, { status: 404 });
    await prisma.user.delete({ where: { id: teacher.userId } });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
